# MovieDB Feature Plan

## Overview
Implement new features for the MovieDB app to enhance user engagement, personalization, and utility. The app is built with Next.js 14, React 18, Tailwind CSS, MongoDB/Mongoose, and uses the TMDB API.

---

## Phase 1: Ratings & Reviews

### 1.1 Create Rating/Review Model
- **File:** `models/rating-model.js`
- Fields: userId, movieId (TMDB id), rating (1-10), reviewText, createdAt
- Unique compound index on (userId, movieId)

### 1.2 Rating API Routes
- **File:** `app/api/ratings/route.js`
  - POST — create/update rating
  - GET — fetch ratings for a movie (with average)
- **File:** `app/api/ratings/[movieId]/route.js`
  - GET — fetch user's rating for specific movie

### 1.3 Rating Component
- **File:** `components/StarRating.jsx`
- 10 clickable stars (or half-star support)
- Show current user's rating if exists

### 1.4 Review Component
- **File:** `components/ReviewForm.jsx`
- Text area with character limit
- Submit button with loading state

### 1.5 Reviews List Component
- **File:** `components/ReviewsList.jsx`
- Display all reviews with ratings, sorted by newest
- Show average rating prominently

### 1.6 Integrate into Movie Detail Page
- **File:** `app/movie/[movieId]/page.js`
- Add StarRating and ReviewForm below movie info
- Add ReviewsList section

---

## Phase 2: Watch History

### 2.1 Create History Model
- **File:** `models/history-model.js`
- Fields: userId, movieId, watchedAt, rating (optional ref)
- Index on userId + watchedAt

### 2.2 History API Routes
- **File:** `app/api/history/route.js`
  - POST — add to history
  - GET — fetch user's watch history (paginated)
- **File:** `app/api/history/[movieId]/route.js`
  - DELETE — remove from history

### 2.3 History Component
- **File:** `components/WatchHistory.jsx`
- Timeline view of watched movies
- "Mark as Watched" button on movie detail

### 2.4 History Page
- **File:** `app/history/page.js`
- Full watch history with date groups
- Stats: total watched, average rating, top genres

---

## Phase 3: Favorites List

### 3.1 Create Favorites Model
- **File:** `models/favorite-model.js`
- Fields: userId, movieId, addedAt
- Unique compound index on (userId, movieId)

### 3.2 Favorites API Routes
- **File:** `app/api/favorites/route.js`
  - POST — add/remove toggle
  - GET — fetch user's favorites

### 3.3 Heart Button Component
- **File:** `components/FavoriteButton.jsx`
- Toggle heart icon on movie detail page
- Add to homepage movie cards

### 3.4 Favorites Page
- **File:** `app/favorites/page.js`
- Grid of favorited movies
- Remove option on each card

---

## Phase 4: Advanced Filters

### 4.1 Filter Component
- **File:** `components/MovieFilters.jsx`
- Genre selector (multi-select)
- Year range slider
- Rating range slider
- Language dropdown
- Runtime range

### 4.2 Filtered Search API
- **File:** `app/api/movies/search/route.js`
- Accept query params for all filter criteria
- Combine with TMDB discover endpoint

### 4.3 Search Results Page Update
- **File:** `app/search-results/page.js`
- Add MovieFilters sidebar
- Update URL params on filter change
- Debounced API calls

---

## Phase 5: Random Movie Picker

### 5.1 Picker Component
- **File:** `components/RandomPicker.jsx`
- "I'm Feeling Lucky" button
- Genre preference dropdown
- Animated reveal of random movie

### 5.2 Random API Route
- **File:** `app/api/random/route.js`
- Fetch from TMDB discover with optional genre filter
- Return random movie from results

### 5.3 Picker Page
- **File:** `app/random/page.js`
- Full-page experience with animation
- "Try Again" button

---

## Phase 6: Release Calendar

### 6.1 Calendar Component
- **File:** `components/ReleaseCalendar.jsx`
- Monthly calendar view
- Movie cards on release dates
- Month navigation

### 6.2 Calendar API Route
- **File:** `app/api/calendar/route.js`
- Fetch upcoming releases from TMDB
- Filter by year/month

### 6.3 Calendar Page
- **File:** `app/calendar/page.js`
- Full calendar view
- List view toggle

---

## Phase 7: Theme Toggle (Dark/Light)

### 7.1 Theme Context
- **File:** `app/contexts/ThemeContext.js`
- Toggle state persisted in localStorage
- CSS class on body/html

### 7.2 Theme Toggle Button
- **File:** `components/ThemeToggle.jsx`
- Sun/Moon icon button
- Add to Header component

### 7.3 CSS Updates
- **File:** `app/globals.css`
- Add dark mode utility classes
- Update all components for dark mode support

---

## Phase 8: Recently Viewed

### 8.1 Recently Viewed Hook
- **File:** `app/hooks/useRecentlyViewed.js`
- Store last 20 viewed movie IDs in localStorage
- Auto-add on movie detail page visit

### 8.2 Recently Viewed Component
- **File:** `components/RecentlyViewed.jsx`
- Horizontal scroll of recently viewed movies
- Add to home page below hero

---

## Phase 9: Export Watchlist

### 9.1 Export Functionality
- **File:** `components/ExportWatchlist.jsx`
- CSV download button
- Shareable link generation

### 9.2 Export API Route
- **File:** `app/api/watchlist/export/route.js`
- Generate CSV content
- Return as downloadable file

---

## Implementation Order

1. **Phase 1** (Ratings/Reviews) — Highest engagement value
2. **Phase 2** (Watch History) — Completes user lifecycle
3. **Phase 3** (Favorites) — Complements watchlist
4. **Phase 8** (Recently Viewed) — Quick win, localStorage only
5. **Phase 5** (Random Picker) — Fun feature, low complexity
6. **Phase 4** (Advanced Filters) — Improves search significantly
7. **Phase 7** (Theme Toggle) — Visual improvement
8. **Phase 6** (Release Calendar) — Nice utility feature
9. **Phase 9** (Export) — Final polish

---

## Technical Notes

- All new models should follow existing patterns in `models/`
- All new API routes should follow existing patterns in `app/api/`
- Components should use existing Tailwind CSS patterns
- Auth-required features should check session via existing `lib/session.js`
- TMDB API calls should go through existing `lib/tmdb.js`
- Use `next-share` for any new social features (already installed)

---

## Files to Create

```
models/
  rating-model.js
  history-model.js
  favorite-model.js

components/
  StarRating.jsx
  ReviewForm.jsx
  ReviewsList.jsx
  WatchHistory.jsx
  FavoriteButton.jsx
  MovieFilters.jsx
  RandomPicker.jsx
  ReleaseCalendar.jsx
  ThemeToggle.jsx
  RecentlyViewed.jsx
  ExportWatchlist.jsx

app/
  api/ratings/route.js
  api/ratings/[movieId]/route.js
  api/history/route.js
  api/history/[movieId]/route.js
  api/favorites/route.js
  api/movies/search/route.js
  api/random/route.js
  api/calendar/route.js
  api/watchlist/export/route.js
  history/page.js
  favorites/page.js
  random/page.js
  calendar/page.js

app/contexts/
  ThemeContext.js

app/hooks/
  useRecentlyViewed.js
```

---

## Estimated Effort

- Phase 1: ~2 hours
- Phase 2: ~1.5 hours
- Phase 3: ~1 hour
- Phase 4: ~1.5 hours
- Phase 5: ~1 hour
- Phase 6: ~1.5 hours
- Phase 7: ~1 hour
- Phase 8: ~0.5 hours
- Phase 9: ~0.5 hours

**Total: ~10.5 hours**
