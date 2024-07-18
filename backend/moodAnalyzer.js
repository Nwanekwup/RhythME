const moodWords = require('./moodWords');

const determineMoodFromLyrics = (lyrics) => {
  const moodScores = {};

  Object.keys(moodWords).forEach((mood) => {
    moodScores[mood] = 0;
    moodWords[mood].forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lyrics.match(regex);
      moodScores[mood] += matches ? matches.length : 0;
    });
  });

  const predominantMood = Object.keys(moodScores).reduce((a, b) =>
    moodScores[a] > moodScores[b] ? a : b
  );

  return predominantMood;
};

module.exports = determineMoodFromLyrics;