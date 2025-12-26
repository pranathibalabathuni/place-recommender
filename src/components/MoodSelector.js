import React from 'react';

const moods = [
  {
    id: 'work',
    title: 'Work & Focus',
    description: 'Quiet cafes, libraries, co-working spaces',
    emoji: '💼'
  },
  {
    id: 'date',
    title: 'Date Night',
    description: 'Romantic restaurants, cozy bars, nice ambiance',
    emoji: '💕'
  },
  {
    id: 'quick-bite',
    title: 'Quick Bite',
    description: 'Fast food, food trucks, grab & go',
    emoji: '🍔'
  },
  {
    id: 'budget',
    title: 'Budget Friendly',
    description: 'Affordable eats, happy hours, deals',
    emoji: '💰'
  }
];

function MoodSelector({ selectedMood, onMoodSelect }) {
  return (
    <div className="mood-selector">
      <h2>What's your mood?</h2>
      <div className="mood-buttons">
        {moods.map(mood => (
          <button
            key={mood.id}
            className={`mood-btn ${selectedMood === mood.id ? 'active' : ''}`}
            onClick={() => onMoodSelect(mood.id)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {mood.emoji}
            </div>
            <h3>{mood.title}</h3>
            <p>{mood.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;