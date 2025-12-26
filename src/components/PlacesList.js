import React from 'react';
import PlaceCard from './PlaceCard';

function PlacesList({ places, userLocation }) {
  return (
    <div className="places-grid">
      {places.map(place => (
        <PlaceCard 
          key={place.place_id} 
          place={place} 
          userLocation={userLocation}
        />
      ))}
    </div>
  );
}

export default PlacesList;