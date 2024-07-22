const moodWords = {
    Happy: ['joy', 'happy', 'smile', 'cheerful', 'delight', 'bliss', 'content', 'merry', 'ecstatic', 'joyful', 'jubilant', 'gleeful', 'elated', 'lively', 'radiant', 'upbeat', 'exuberant', 'pleased', 'sunny', 'buoyant'],
    Sad: ['sad', 'cry', 'tears', 'sorrow', 'melancholy', 'grief', 'mournful', 'heartbroken', 'depressed', 'gloomy', 'despondent', 'dejected', 'somber', 'downcast', 'wistful', 'forlorn', 'lament', 'dismal', 'blue', 'unhappy'],
    Motivated: ['motivate', 'inspire', 'drive', 'ambition', 'goal', 'determined', 'committed', 'focused', 'enthusiastic', 'passionate', 'eager', 'striving', 'purposeful', 'resolute', 'spirited', 'tenacious', 'energized', 'proactive', 'aspiring', 'goal-oriented'],
    Calm: ['calm', 'peace', 'serene', 'tranquil', 'relax', 'composed', 'still', 'quiet', 'restful', 'soothing', 'gentle', 'placid', 'untroubled', 'collected', 'unworried', 'mellow', 'at ease', 'serene', 'laid-back', 'tranquil'],
    Playful: ['play', 'fun', 'laugh', 'joke', 'amuse', 'frolic', 'jolly', 'whimsical', 'lively', 'spirited', 'mischievous', 'teasing', 'lighthearted', 'gleeful', 'giggle', 'chuckle', 'joyous', 'prank', 'jest', 'sporty'],
    Energetic: ['energy', 'lively', 'vigor', 'dynamic', 'active', 'spirited', 'peppy', 'animated', 'vibrant', 'vigorous', 'zestful', 'enthusiastic', 'bustling', 'high-spirited', 'hyper', 'invigorated', 'bouncy', 'excitable', 'perky', 'agile'],
    Confident: ['confident', 'bold', 'sure', 'certain', 'assertive', 'self-assured', 'fearless', 'poised', 'determined', 'secure', 'unwavering', 'gutsy', 'strong', 'self-reliant', 'assured', 'decisive', 'audacious', 'commanding', 'self-confident', 'empowered'],
    Creative: ['create', 'innovate', 'imagine', 'invent', 'artistic', 'original', 'ingenious', 'inspired', 'visionary', 'resourceful', 'inventive', 'imaginative', 'clever', 'productive', 'expressive', 'unique', 'design', 'craft', 'generate', 'think outside the box'],
    Focused: ['focus', 'concentrate', 'attentive', 'dedicated', 'engaged', 'determined', 'absorbed', 'intent', 'fixated', 'immersed', 'committed', 'unwavering', 'goal-oriented', 'meticulous', 'thorough', 'diligent', 'single-minded', 'disciplined', 'persistent', 'steadfast'],
    Stressed: ['stress', 'anxiety', 'tense', 'worry', 'pressure', 'overwhelmed', 'strained', 'uptight', 'frazzled', 'distressed', 'agitated', 'nervous', 'restless', 'jittery', 'panicked', 'frantic', 'troubled', 'flustered', 'uneasy', 'burdened'],
    Romantic: ['love', 'romance', 'passion', 'heart', 'affection', 'adore', 'cherish', 'sweetheart', 'beloved', 'amorous', 'infatuated', 'intimate', 'tender', 'affectionate', 'ardent', 'darling', 'devoted', 'enamored', 'fondness', 'soulmate'],
};
  
module.exports = moodWords;