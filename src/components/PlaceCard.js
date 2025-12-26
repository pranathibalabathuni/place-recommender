import React from 'react';
import { calculateDistance } from '../utils/distance';
import { isPlaceOpen } from '../utils/hours';

function PlaceCard({ place, userLocation }) {
  const distance = calculateDistance(
    userLocation.lat, 
    userLocation.lng, 
    place.geometry.location.lat(), 
    place.geometry.location.lng()
  );

  const isOpen = isPlaceOpen(place.opening_hours);

  return (
    <div className="place-card">
      <div className="place-header">
        <h3 className="place-name">{place.name}</h3>
        {place.rating && (
          <span className="place-rating">
            ⭐ {place.rating}
          </span>
        )}
      </div>
      
      <div className="place-info">
        <p className="place-distance">
          📍 {distance.toFixed(1)} km away
        </p>
        
        {place.opening_hours && (
          <p className={`place-status ${isOpen ? 'open' : 'closed'}`}>
            {isOpen ? '🟢 Open now' : '🔴 Closed'}
          </p>
        )}
        
        {place.price_level && (
          <p className="place-price">
            {'💲'.repeat(place.price_level)}
          </p>
        )}
      </div>

      {place.vicinity && (
        <p className="place-address">
          {place.vicinity}
        </p>
      )}
    </div>
  );
}

export default PlaceCard;