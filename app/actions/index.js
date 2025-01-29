"use server";

async function registerUser(formData) {
    const { password, confirmPassword, ...user } = formData;

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...user, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed.");
        }

        return await response.json();
    } catch (error) {
        console.error("🔥 Error registering user:", error.message);
        throw error;
    }
}

async function loginUser(credentials) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("🔥 Login Error:", error.message);
        throw error;
    }
}

async function addToWatchlist(movieData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watchlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movieData),
        });

        if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message || "Failed to add movie to Watchlist.");
        }

        return await res.json();
    } catch (error) {
        console.error("🔥 Error adding to Watchlist:", error.message);
        throw error;
    }
}

async function isMovieInWatchlist(userId, movieId) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watchlist?userId=${userId}&movieId=${movieId}`);
        if (!res.ok) throw new Error("Failed to check if movie is in Watchlist.");

        const data = await res.json();
        return data.isInWatchlist;
    } catch (error) {
        console.error("🔥 Error checking Watchlist:", error.message);
        return false;
    }
}


export { registerUser, loginUser, addToWatchlist, isMovieInWatchlist };
