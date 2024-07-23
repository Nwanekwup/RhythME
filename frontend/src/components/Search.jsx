import React, { useState, useEffect } from "react";
import "./Search.css";

const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS;

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query === '') {
      setResults([]);
    }
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${backendAddress}/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for songs by title, artist, lyrics, or mood"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {results.map((song) => (
          <div key={song.id} className="song">
            <h3 classname='song-title'>{song.title}</h3>
            <p classname='artist'>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Search;
