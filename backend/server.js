require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
const prisma = new PrismaClient();

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
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
    subject: 'Verify your email',
    text: emailText,
  });
};

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const verificationToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await sendVerificationEmail(email, username, verificationToken);
    res.status(201).json({ message: 'User created. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ error: 'User could not be created.' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(403).json({ status: 'bad username/password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ status: 'logged in', token });
    } else {
      res.status(403).json({ status: 'bad username/password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { isVerified: true },
    });
    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
<<<<<<< Updated upstream
=======

app.post("/submit-answers", async (req, res) => {
  const { userId, answers, questions } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: +userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userAnswer = await prisma.userAnswer.create({
      data: {
        userId: user.id,
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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
>>>>>>> Stashed changes
