import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';
import PlacesList from './components/PlacesList';
import { getPlacesByMood } from './services/placesService';
import { getCurrentLocation } from './utils/location';

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        setUserLocation(location);
      })
      .catch(err => {
        setError('Unable to get your location. Please enable location services.');
      });
  }, []);

  const handleMoodSelect = async (mood) => {
    if (!userLocation) {
      setError('Location not available. Please refresh and allow location access.');
      return;
    }

    setSelectedMood(mood);
    setLoading(true);
    setError('');

    try {
      const nearbyPlaces = await getPlacesByMood(mood, userLocation);
      setPlaces(nearbyPlaces);
    } catch (err) {
      setError('Failed to fetch places. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Smart Places</h1>
        <p>Find the perfect spot for your mood</p>
      </header>

      <MoodSelector 
        selectedMood={selectedMood}
        onMoodSelect={handleMoodSelect}
      />

      {error && <div className="error">{error}</div>}
      
      {loading && <div className="loading">Finding perfect places for you...</div>}
      
      {places.length > 0 && (
        <PlacesList places={places} userLocation={userLocation} />
      )}
    </div>
  );
}

export default App;