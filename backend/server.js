require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
const querystring = require("querystring");
const axios = require("axios");
const getSpotifyAccessToken = require("./spotify");
const getLyrics = require("./musixmatch");
const determineMoodFromLyrics = require('./moodAnalyzer');
const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

const prisma = new PrismaClient();

app.get("/spotify-token", async (req, res) => {
  const accessToken = await getSpotifyAccessToken();
  if (accessToken) {
    res.json({ accessToken });
  } else {
    res.status(500).json({ error: "Failed to fetch access token" });
  }
});

app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email";
  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
    });
  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    json: true,
  };

  try {
    const response = await axios.post(
      authOptions.url,
      querystring.stringify(authOptions.form),
      { headers: authOptions.headers }
    );
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    res.redirect(
      `${process.env.FRONTEND_URL}/callback#access_token=${accessToken}&refresh_token=${refreshToken}`
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate with Spotify" });
  }
});

app.get("/lyrics", async (req, res) => {
  const { trackName, artistName } = req.query;

  if (!trackName || !artistName) {
    return res
      .status(400)
      .json({ error: "trackName and artistName are required" });
  }

  try {
    const lyrics = await getLyrics(trackName, artistName);
    if (lyrics) {
      res.json({ lyrics });
    } else {
      res.status(404).json({ error: "Lyrics not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/add-song", async (req, res) => {
  const { title, artist } = req.body;

  try {
    const lyrics = await getLyrics(title, artist);
    if (!lyrics) {
      return res.status(404).json({ error: "Lyrics not found" });
    }

    const mood = determineMoodFromLyrics(lyrics);
    const song = await prisma.song.create({
      data: {
        title,
        artist,
        lyrics,
        mood,
      },
    });

    res.status(201).json({ song });
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/recommendations", async (req, res) => {
  const { mood } = req.query;

  try {
    const songs = await prisma.song.findMany({
      where: { mood },
    });
    res.json(songs);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, username, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;
  const emailText = `Hello ${username}, please verify your email by clicking on the link: ${verificationUrl}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    text: emailText,
  });
};

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log("Received signup request:", { username, email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const verificationToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    await sendVerificationEmail(email, username, verificationToken);
    res
      .status(201)
      .json({ message: "User created. Please verify your email." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "User could not be created." });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(403).json({ status: "bad username/password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const userId = user.id;
      res.status(201).json({ status: "logged in", token, userId });
    } else {
      res.status(403).json({ status: "bad username/password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/verify-email", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { isVerified: true },
    });
    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
});

app.post("/submit-answers", async (req, res) => {
  try {
    const { userId, answers, questions, mood } = req.body;
    console.log("Received Data:", { userId, answers, questions, mood });
    const user = await prisma.user.findUnique({ where: { id: +userId } });
    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    const userAnswer = await prisma.userAnswer.create({
      data: {
        userId: user.id,
        mood,
        answers: {
          create: answers.map((answer, index) => ({
            question: questions[index],
            answer: `${answer}`,
          })),
        },
      },
    });
    res.status(201).json({ message: "Answers submitted successfully" });
  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
