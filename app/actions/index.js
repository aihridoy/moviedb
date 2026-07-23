"use server";

import { cookies } from "next/headers";
import { setSession, clearSession } from "@/lib/session";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Server actions run in a separate request than the browser, so cookies aren't
// forwarded automatically. Attach them explicitly when calling our own API.
function withCookies(headers = {}) {
    return { ...headers, Cookie: cookies().toString() };
}

async function registerUser(formData) {
    const { password, confirmPassword, ...user } = formData;

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
    }

    const response = await fetch(`${BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
    }

    return await response.json();
}

async function loginUser(credentials) {
    const response = await fetch(`${BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
    }

    const user = await response.json();
    setSession(user._id); // httpOnly signed cookie, survives refresh
    return user;
}

async function logoutUser() {
    clearSession();
}

async function addToWatchlist(movieData) {
    const res = await fetch(`${BASE}/api/watchlist`, {
        method: "POST",
        headers: withCookies({ "Content-Type": "application/json" }),
        body: JSON.stringify(movieData),
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to add movie to Watchlist.");
    }

    return await res.json();
}

async function submitRating({ movieId, rating, reviewText }) {
    const res = await fetch(`${BASE}/api/ratings`, {
        method: "POST",
        headers: withCookies({ "Content-Type": "application/json" }),
        body: JSON.stringify({ movieId, rating, reviewText }),
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to submit rating.");
    }

    return await res.json();
}

async function markAsWatched(movieData) {
    const res = await fetch(`${BASE}/api/history`, {
        method: "POST",
        headers: withCookies({ "Content-Type": "application/json" }),
        body: JSON.stringify(movieData),
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to mark as watched.");
    }

    return await res.json();
}

async function removeFromHistory(movieId) {
    const res = await fetch(`${BASE}/api/history/${movieId}`, {
        method: "DELETE",
        headers: withCookies(),
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to remove from history.");
    }

    return await res.json();
}

async function isMovieInWatchlist(movieId) {
    try {
        const res = await fetch(`${BASE}/api/watchlist?movieId=${movieId}`, {
            headers: withCookies(),
        });
        if (!res.ok) throw new Error("Failed to check if movie is in Watchlist.");
        const data = await res.json();
        return data.isInWatchlist;
    } catch (error) {
        console.error("🔥 Error checking Watchlist:", error.message);
        return false;
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    addToWatchlist,
    isMovieInWatchlist,
    submitRating,
    markAsWatched,
    removeFromHistory,
};
