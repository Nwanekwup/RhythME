import React, { useState, useEffect } from "react";
import "./Search.css";

const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS;

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);

  useEffect(() => {
    // Fetch available moods from the database
    const fetchMoods = async () => {
      try {
        const response = await fetch(`${backendAddress}/moods`);
        const data = await response.json();
        setMoods(data);
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };
    fetchMoods();
  }, []);

  useEffect(() => {
    if (query === "" && selectedMoods.length === 0) {
      setResults([]);
    }
  }, [query, selectedMoods]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${backendAddress}/search?query=${query}&moods=${selectedMoods.join(
          ","
        )}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  return (
    <div className="search-container">
      <header>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for songs by title, artist, lyrics, or mood"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="mood-filters">
          {moods.map((mood) => (
            <button
              key={mood}
              className={`mood-button ${
                selectedMoods.includes(mood) ? "selected" : ""
              }`}
              onClick={() => toggleMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
      </header>

      <div className="results">
        {results.map((song) => (
          <div key={song.id} className="song">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;