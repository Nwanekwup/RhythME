import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoodBoard.css";

const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS;

const MoodBoard = () => {
  const { userId } = useParams();
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoodAndSongs = async () => {
      try {
        const response = await fetch(
          `${backendAddress}/recommendations?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.songs) {
          throw new Error("No songs found");
        }
        setMood(data.mood);
        setSongs(data.songs);
      } catch (error) {
        console.error("Error fetching mood and songs:", error);
        setError(error.message);
      }
    };

    fetchMoodAndSongs();
  }, [userId]);

  if (error) {
    return <div className="moodboard-container">Error: {error}</div>;
  }

  return (
    <div className="moodboard-container">
      <h2>You seem {mood}</h2>
      <h3>These songs should match your vibe!</h3>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">by {song.artist}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodBoard;
