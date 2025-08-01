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
- Secure user registration and login system
- Password hashing with `bcrypt` for enhanced security
- MongoDB-based user data storage and session management
- Protected routes and personalized user experiences

### 🎥 Movie Discovery
- Browse extensive movie database powered by TMDB API
- Advanced search functionality with real-time results
- Dynamic movie data rendering with detailed information
- High-quality movie posters and backdrop images

### 📝 Personalized Experience
- **Watchlist Management**: Save and organize favorite movies
- **Personal Collections**: Create custom movie lists
- **User Preferences**: Tailored recommendations based on viewing history
- **Social Sharing**: Share movie details across social platforms

### 🎨 User Interface & Performance
- Fully responsive design optimized for all devices
- Modern, sleek UI crafted with **Tailwind CSS**
- Lightning-fast image loading with `sharp` optimization
- Smooth animations and intuitive navigation

### 🔧 Additional Features
- Social media sharing integration with `next-share`
- Image optimization and caching for better performance
- SEO-optimized pages for better search visibility
- Error handling and loading states for smooth UX

---

## 🛠️ Tech Stack

### Frontend & Backend
- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with modern hooks
- **Styling**: Tailwind CSS for responsive design
- **API**: Next.js API Routes for backend functionality

### Database & Authentication
- **Database**: MongoDB with Mongoose ODM
- **Security**: bcrypt for password hashing
- **Session Management**: Secure user authentication system

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
   TMDB_BASE_URL="https://api.themoviedb.org/3"

   # Application Configuration
   # Base URL for API calls (update for production)
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

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

---

## 📁 Project Structure

```
lws-moviedb/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes for backend functionality
│   ├── auth/              # Authentication pages
│   ├── movie/             # Movie detail pages
│   └── ...                # Other app pages
├── components/            # Reusable React components
│   ├── ui/                # UI components
│   ├── movie/             # Movie-specific components
│   └── auth/              # Authentication components
├── lib/                   # Utility functions and configurations
│   ├── mongodb.js         # Database connection
│   ├── tmdb.js           # TMDB API helpers
│   └── utils.js          # General utilities
├── models/                # MongoDB/Mongoose models
│   ├── User.js           # User model
│   └── Movie.js          # Movie model
├── public/                # Static assets
│   └── images/           # Application images
├── styles/                # Global styles and Tailwind config
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
└── package.json          # Project dependencies
```

---

## 🔐 Environment Variables Guide

### Required Environment Variables

| Variable | Description | Example | How to Get |
|----------|-------------|---------|------------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/movieDB` | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| `TMDB_API_KEY` | The Movie Database API key | `your_tmdb_api_key_here` | [TMDB API](https://www.themoviedb.org/settings/api) |
| `TMDB_BASE_URL` | TMDB API base URL | `"https://api.themoviedb.org/3"` | Static value |
| `NEXT_PUBLIC_API_BASE_URL` | Application base URL | `http://localhost:3000` | Your domain |

### Getting TMDB API Key
1. Create an account at [The Movie Database](https://www.themoviedb.org/)
2. Go to your account settings
3. Navigate to the API section
4. Request an API key (it's free!)
5. Copy your API key to the environment file

---

## 🎯 API Endpoints

### Movie Endpoints
- `GET /api/movies` - Get popular movies
- `GET /api/movies/search?q={query}` - Search movies
- `GET /api/movies/{id}` - Get movie details

### User Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/watchlist` - Get user watchlist
- `POST /api/user/watchlist` - Add movie to watchlist

---

## 📋 Future Enhancements

- 🎭 **Actor Profiles**: Detailed actor information and filmography
- 🎬 **Movie Recommendations**: AI-powered personalized suggestions
- 👥 **Social Features**: Follow friends and see their watchlists
- ⭐ **Rating System**: Rate and review movies
- 🎪 **Advanced Filters**: Genre, year, rating, and more
- 📱 **Mobile App**: React Native companion application
- 🎵 **Trailer Integration**: Watch movie trailers inline
- 🏆 **Achievement System**: Gamify the movie discovery experience

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