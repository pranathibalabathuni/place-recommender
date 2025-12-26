# Smart Nearby Places Recommender

A React-based location app that recommends nearby places based on your current mood and preferences.

## Features

- **Mood-based recommendations**: Choose from Work, Date Night, Quick Bite, or Budget options
- **Real-time location**: Uses your current location to find nearby places
- **Smart filtering**: Filters results based on ratings, price, and distance
- **Live status**: Shows if places are currently open
- **Distance calculation**: Displays how far each place is from you

## Tech Stack

- React 18
- Google Maps JavaScript API
- Google Places API
- Geolocation API
- Modern CSS with Grid/Flexbox

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Get a Google Maps API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API and Places API
   - Create an API key

4. Create `.env` file:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## How It Works

1. **Location Detection**: App requests user's current location
2. **Mood Selection**: User picks their current mood/need
3. **API Integration**: Searches Google Places API based on mood criteria
4. **Smart Filtering**: Filters and sorts results by rating, distance, and mood-specific criteria
5. **Real-time Display**: Shows places with ratings, distance, and open/closed status

## Mood Categories

- **Work & Focus**: Cafes, libraries, co-working spaces with WiFi
- **Date Night**: Romantic restaurants, bars with good ratings (4.0+)
- **Quick Bite**: Fast food, takeaway, food trucks
- **Budget Friendly**: Affordable options (price level ≤ 2)

## Project Structure

```
src/
├── components/
│   ├── MoodSelector.js    # Mood selection interface
│   ├── PlacesList.js      # Grid layout for places
│   └── PlaceCard.js       # Individual place display
├── services/
│   └── placesService.js   # Google Places API integration
├── utils/
│   ├── location.js        # Geolocation utilities
│   ├── distance.js        # Distance calculations
│   └── hours.js           # Opening hours logic
└── App.js                 # Main application component
```

## Deployment Options

### 1. Vercel (Recommended)

**Easiest deployment with automatic builds:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Add environment variable: `REACT_APP_GOOGLE_MAPS_API_KEY`
5. Deploy automatically on every push

**Manual deployment:**
```bash
npm install -g vercel
vercel --prod
```

### 2. Netlify

**Drag & drop or Git integration:**

1. Build your app: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `build` folder to deploy
4. Add environment variable in site settings

**Or connect to Git:**
1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables

### 3. GitHub Pages

**Free hosting on GitHub:**

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Enable GitHub Actions as source
4. Add `REACT_APP_GOOGLE_MAPS_API_KEY` to repository secrets
5. Push to main branch to trigger deployment

**Manual deployment:**
```bash
npm install
npm run deploy
```

### 4. Firebase Hosting

**Google's hosting platform:**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Environment Variables

For all deployments, you need to set:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Security Note:** Never commit your actual API key to Git. Always use environment variables in production.

## Key Features Demonstrated

- **API Integration**: Google Maps & Places APIs
- **Real-world UX**: Location-based recommendations
- **Data Handling**: Filtering, sorting, deduplication
- **Frontend Logic**: State management, error handling
- **Responsive Design**: Mobile-friendly interface