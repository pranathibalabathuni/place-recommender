export const isPlaceOpen = (openingHours) => {
  if (!openingHours) {
    return null; // Unknown status
  }
  
  if (openingHours.open_now !== undefined) {
    return openingHours.open_now;
  }
  
  // If we have periods, check current time
  if (openingHours.periods) {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todayPeriods = openingHours.periods.filter(
      period => period.open && period.open.day === currentDay
    );
    
    if (todayPeriods.length === 0) {
      return false; // Closed today
    }
    
    return todayPeriods.some(period => {
      const openTime = parseInt(period.open.time);
      const closeTime = period.close ? parseInt(period.close.time) : 2359;
      
      if (closeTime > openTime) {
        return currentTime >= openTime && currentTime <= closeTime;
      } else {
        // Crosses midnight
        return currentTime >= openTime || currentTime <= closeTime;
      }
    });
  }
  
  return null;
};