import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

let googleMaps = null;
let placesService = null;

const initializeGoogleMaps = async () => {
  if (!googleMaps) {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    googleMaps = await loader.load();
    
    // Create a dummy map element for PlacesService
    const mapDiv = document.createElement('div');
    const map = new googleMaps.maps.Map(mapDiv);
    placesService = new googleMaps.maps.places.PlacesService(map);
  }
  
  return { googleMaps, placesService };
};

const getMoodSearchTypes = (mood) => {
  const moodMap = {
    'work': ['cafe', 'library', 'coworking_space'],
    'date': ['restaurant', 'bar', 'night_club'],
    'quick-bite': ['meal_takeaway', 'fast_food', 'food'],
    'budget': ['meal_takeaway', 'fast_food', 'cafe']
  };
  
  return moodMap[mood] || ['restaurant'];
};

const getMoodKeywords = (mood) => {
  const keywordMap = {
    'work': ['wifi', 'quiet', 'coffee', 'study'],
    'date': ['romantic', 'fine dining', 'wine', 'intimate'],
    'quick-bite': ['fast', 'takeaway', 'quick', 'grab'],
    'budget': ['cheap', 'affordable', 'budget', 'deal']
  };
  
  return keywordMap[mood] || [];
};

export const getPlacesByMood = async (mood, userLocation) => {
  try {
    await initializeGoogleMaps();
    
    const searchTypes = getMoodSearchTypes(mood);
    const allPlaces = [];

    // Search for each type
    for (const type of searchTypes) {
      const places = await searchPlacesByType(type, userLocation);
      allPlaces.push(...places);
    }

    // Remove duplicates and sort by rating and distance
    const uniquePlaces = removeDuplicates(allPlaces);
    const filteredPlaces = filterByMood(uniquePlaces, mood);
    
    return sortPlaces(filteredPlaces, userLocation);
    
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
};

const searchPlacesByType = (type, userLocation) => {
  return new Promise((resolve, reject) => {
    const request = {
      location: new googleMaps.maps.LatLng(userLocation.lat, userLocation.lng),
      radius: 2000, // 2km radius
      type: type,
      openNow: false // We'll filter this in the UI
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === googleMaps.maps.places.PlacesServiceStatus.OK) {
        resolve(results || []);
      } else {
        reject(new Error(`Places search failed: ${status}`));
      }
    });
  });
};

const removeDuplicates = (places) => {
  const seen = new Set();
  return places.filter(place => {
    if (seen.has(place.place_id)) {
      return false;
    }
    seen.add(place.place_id);
    return true;
  });
};

const filterByMood = (places, mood) => {
  const keywords = getMoodKeywords(mood);
  
  return places.filter(place => {
    // Basic filtering based on mood
    if (mood === 'budget') {
      return !place.price_level || place.price_level <= 2;
    }
    
    if (mood === 'date') {
      return place.rating >= 4.0;
    }
    
    return true;
  });
};

const sortPlaces = (places, userLocation) => {
  return places
    .map(place => ({
      ...place,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      )
    }))
    .sort((a, b) => {
      // Sort by rating first, then by distance
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (Math.abs(ratingDiff) > 0.5) {
        return ratingDiff;
      }
      return a.distance - b.distance;
    })
    .slice(0, 12); // Limit to 12 results
};

const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};