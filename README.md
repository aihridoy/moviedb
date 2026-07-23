# 🎬 MovieDB - Movie Discovery App

![MovieDB Homepage](https://i.ibb.co.com/1fXwKrj4/moviedb.png)

A dynamic MovieDB clone built with **Next.js**, **React**, and **MongoDB**, offering a seamless experience for exploring, saving, and sharing movies. Discover your next favorite film with powerful search capabilities and personalized features!

---

## 🌟 Live Demo

**🔗 [Visit MovieDB](https://lws-moviedb-chi.vercel.app)**

Experience the full movie discovery journey with our live application!

---

## 📖 Overview

This project is a full-stack web application inspired by IMDb and TMDb, featuring comprehensive movie browsing, user authentication, and personalized watchlists. Built with modern web development practices, it emphasizes performance, scalability, and exceptional user engagement through intuitive design and robust functionality.

---

## ✨ Key Features

### 🔐 Authentication & Security
- Secure user registration and login
- Password hashing with `bcrypt` (passwords never returned to the client)
- **Signed, httpOnly cookie sessions** (HMAC via Node `crypto`, no JWT dependency) — persist across refresh, cleared on logout
- Session-protected API routes; watchlist/history/favorites scoped per user

### 🎥 Movie Discovery
- Browse trending, popular, top-rated, and now-playing movies (TMDB API)
- Search with results, plus **advanced filters** (genre, year range, minimum rating, language, runtime) via TMDB Discover
- Movie detail pages with cast, genres, and similar titles
- **Random Movie Picker** — "I'm Feeling Lucky" with optional genre filter
- **Release Calendar** — monthly grid + list view of releases

### ⭐ Ratings & Reviews
- Rate movies 1–10 and write reviews
- Average rating and all reviews shown on each movie page
- One rating per user per movie (updatable)

### 📝 Personalized Experience
- **Watchlist**: save movies, export to CSV or copy a shareable list
- **Watch History**: mark movies watched; timeline + stats (total watched, average rating, top genres)
- **Favorites**: heart movies from cards or the detail page; dedicated favorites grid
- **Recently Viewed**: last 20 viewed movies (localStorage), shown on the home page
- **Social Sharing**: share movie details across platforms (`next-share`)

### 🎨 User Interface & Performance
- **Dark / light theme toggle**, persisted in localStorage (no flash on load)
- Fully responsive design built with **Tailwind CSS**
- Fast image loading with `sharp` optimization
- Custom animated loading spinner, route-level error/loading states

### 🔧 Additional Features
- SEO: dynamic `sitemap.xml` and `robots.txt`, per-movie metadata
- Centralized TMDB access layer (`lib/tmdb.js`)
- Unit tests (session token) + CI (lint, test, build) via GitHub Actions

---

## 🛠️ Tech Stack

### Frontend & Backend
- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with modern hooks
- **Styling**: Tailwind CSS for responsive design
- **API**: Next.js API Routes for backend functionality

### Database & Authentication
- **Database**: MongoDB with Mongoose ODM
- **Security**: bcrypt password hashing
- **Session Management**: signed httpOnly cookies (HMAC via Node `crypto`, no JWT dependency)

### External APIs & Services
- **Movie Data**: The Movie Database (TMDB) API
- **Deployment**: Vercel for seamless hosting
- **Image Optimization**: Sharp for fast-loading visuals

### Key Dependencies
| Package | Purpose | Version |
|---------|---------|---------|
| `bcrypt` | Password hashing and security | Latest |
| `next-share` | Social media sharing | Latest |
| `sharp` | Image optimization | Latest |
| `mongoose` | MongoDB object modeling | Latest |
| `tailwindcss` | Utility-first CSS framework | Latest |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git** - [Download here](https://git-scm.com/)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/lws-moviedb.git
   cd lws-moviedb
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Database Configuration
   # MongoDB connection string for the movie database
   MONGO_URI=mongodb+srv://[username]:[password]@cluster0.suylw.mongodb.net/movieDB

   # TMDB API Configuration
   # Get your API key from https://www.themoviedb.org/settings/api
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3

   # Application Configuration
   # Base URL for API calls (update for production)
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

   # Session Configuration
   # Secret used to sign session cookies — generate with: openssl rand -hex 32
   SESSION_SECRET=your_long_random_secret
   ```

   > A ready-to-copy template lives in `.env.example`.

   > ⚠️ **Security Note**: Never commit your `.env.local` file to version control. Replace placeholder values with your actual credentials.

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser to see MovieDB in action!

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Testing & Linting

```bash
npm test     # node:test unit tests (session token)
npm run lint # ESLint
```

---

## 📁 Project Structure

```
lws-moviedb/
├── app/                    # Next.js 14 App Router
│   ├── api/               # Route handlers (movies, auth, ratings, history, favorites, watchlist, random, calendar)
│   ├── actions/           # Server actions (login, watchlist, ratings, ...)
│   ├── contexts/          # Search + Theme context
│   ├── hooks/             # useAuth, useRecentlyViewed
│   ├── movie/[movieId]/   # Movie detail page
│   ├── history/ favorites/ random/ calendar/ ...  # Feature pages
│   ├── sitemap.js robots.js error.js loading.js
│   └── layout.js page.js
├── components/            # Reusable React components
├── lib/                   # session.js, token.mjs, tmdb.js, genres.js
├── models/                # user, watchlist, rating, history, favorite (Mongoose)
├── services/mongo.js      # DB connection
├── test/                  # node:test unit tests
├── .env.example           # Env var template
├── next.config.mjs        # Next.js configuration
└── package.json           # Project dependencies
```

---

## 🔐 Environment Variables Guide

### Required Environment Variables

| Variable | Description | Example | How to Get |
|----------|-------------|---------|------------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/movieDB` | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| `TMDB_API_KEY` | The Movie Database API key | `your_tmdb_api_key_here` | [TMDB API](https://www.themoviedb.org/settings/api) |
| `TMDB_BASE_URL` | TMDB API base URL | `https://api.themoviedb.org/3` | Static value |
| `NEXT_PUBLIC_API_BASE_URL` | Application base URL | `http://localhost:3000` | Your domain |
| `SESSION_SECRET` | Secret for signing session cookies | `openssl rand -hex 32` | Generate yourself |

> ⚠️ Enter values **without quotes** in the Vercel dashboard. `SESSION_SECRET` is required — auth-gated features return 500 without it.

### Getting TMDB API Key
1. Create an account at [The Movie Database](https://www.themoviedb.org/)
2. Go to your account settings
3. Navigate to the API section
4. Request an API key (it's free!)
5. Copy your API key to the environment file

---

## 🎯 API Endpoints

### Movies (TMDB)
- `GET /api/movies/popular` · `trending` · `top-rated` · `now-playing` — accept `?page=`
- `GET /api/movies/search?query={q}` — text search, or filters (`genres,yearMin,yearMax,ratingMin,language,runtimeMin,runtimeMax`) via Discover
- `GET /api/movies/{id}` — details · `/{id}/credits` · `/{id}/similar`
- `GET /api/random?genre={id}` — random movie
- `GET /api/calendar?year={y}&month={m}` — releases in a month

### Auth & Session
- `POST /api/register` · `POST /api/login` · `GET /api/me` (current user from session)
- Logout is a server action that clears the session cookie

### User Data (session-protected)
- `GET|POST /api/watchlist` · `GET /api/watchlists` · `GET /api/watchlist/export` (CSV)
- `POST /api/ratings` · `GET /api/ratings?movieId={id}` · `GET /api/ratings/{movieId}`
- `GET|POST /api/history` · `DELETE /api/history/{movieId}`
- `GET|POST /api/favorites`

---

## 📋 Future Enhancements

- 🎭 **Actor Profiles**: Detailed actor information and filmography
- 🎬 **Movie Recommendations**: AI-powered personalized suggestions
- 👥 **Public shareable watchlist**: token-based read-only link (currently exports to CSV / copy-list)
- ⭐ **Half-star ratings**: finer-grained rating input
- 🌗 **Fuller light theme**: per-component `dark:` variants for pixel-perfect light mode
- 📱 **Mobile App**: React Native companion application
- 🎵 **Trailer Integration**: Watch movie trailers inline

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
Error: Failed to connect to MongoDB
```
- Verify your `MONGO_URI` is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure your database user has proper permissions

**TMDB API Error**
```bash
Error: Invalid API key
```
- Verify your `TMDB_API_KEY` is correct
- Check if your API key is active
- Ensure you're not exceeding rate limits

---

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing comprehensive movie data
- **Next.js Team** for the incredible React framework
- **MongoDB** for the flexible database solution
- **Tailwind CSS** for the utility-first styling approach
- **Vercel** for seamless deployment and hosting

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-username/lws-moviedb/issues)
- **Live Demo**: [https://lws-moviedb-chi.vercel.app](https://lws-moviedb-chi.vercel.app)
- **Documentation**: Check this README for comprehensive setup guide

---

**Discover Amazing Movies with MovieDB! 🍿✨**