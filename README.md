# MovieDB: Movie Discovery App

![MovieDB Homepage](https://i.ibb.co.com/1fXwKrj4/moviedb.png)  
A dynamic MovieDB clone built with **Next.js**, **React**, and **MongoDB**, offering a seamless experience for exploring, saving, and sharing movies. Discover your next favorite film!

## 📖 Overview

This project is a full-stack web application inspired by IMDb and TMDb, featuring movie browsing, user authentication, and personalized watchlists. It demonstrates modern web development with a focus on performance, scalability, and user engagement.

## ✨ Features

- **User Authentication**: Secure sign-up/login with password hashing via `bcrypt` and MongoDB integration.
- **Movie Browsing**: Search and explore movies with dynamic data rendering.
- **Watchlist Management**: Save favorite movies to personalized lists.
- **Responsive Design**: Sleek, mobile-friendly UI styled with Tailwind CSS.
- **Social Sharing**: Share movie details easily with `next-share`.
- **Image Optimization**: Fast-loading visuals powered by `sharp`.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: MongoDB, Mongoose
- **Libraries**:
  - `bcrypt`: For secure password hashing
  - `next-share`: For social sharing
  - `sharp`: For image optimization
- **Tools**: ESLint, PostCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/lws-moviedb.git
   cd lws-moviedb
2. **Install dependencies**:
   ```bash
   npm install
   npm run dev
3. **Build for Production**:
   ```bash
   npm run build
   npm start
### ENV File

.env.local:
```
MONGO_URI=
TMDB_API_KEY=
TMDB_BASE_URL=
NEXT_PUBLIC_API_BASE_URL=
