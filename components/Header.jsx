"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useSearch } from "@/app/contexts/SearchContext";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import { logoutUser } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
    const { auth, setAuth } = useAuth();
    const { fetchSearchResults } = useSearch();
    const { count: favoritesCount } = useFavorites();
    const [input, setInput] = useState("");
    const router = useRouter();

    const isLoggedIn = !!auth?.firstName;

    const handleSearch = (e) => {
        e.preventDefault();
        fetchSearchResults(input);
        router.push(`/search-results?query=${encodeURIComponent(input)}`);
    };

    const handleLogout = async () => {
        await logoutUser();
        setAuth(null);
        router.push("/");
    };

    const checkLoggedInUser = () => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            router.push("/watchlists");
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="text-red-600 text-4xl font-bold">
                        MOVIE DB
                    </Link>
                    <div className="ml-8 space-x-4">
                        <Link href="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link href="/compare-movies" className="text-white hover:text-gray-300">
                            Compare Movies
                        </Link>
                        <Link href="/history" className="text-white hover:text-gray-300">
                            History
                        </Link>
                        <Link href="/favorites" className="text-white hover:text-gray-300 inline-flex items-center gap-1">
                            Favorites
                            {favoritesCount > 0 && (
                                <span className="bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/random" className="text-white hover:text-gray-300">
                            Random
                        </Link>
                        <Link href="/calendar" className="text-white hover:text-gray-300">
                            Calendar
                        </Link>
                        <button
                            onClick={checkLoggedInUser}
                            className="text-white hover:text-gray-300"
                        >
                            Watch Later
                        </button>
                    </div>
                </div>
                <div className="relative flex items-center">
                    {isLoggedIn ? (
                        <div className="flex items-center text-white mx-4 gap-3">
                            <span><span className="font-bold">Welcome,</span> {auth.firstName}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-black bg-opacity-50 px-3 py-1 rounded border border-gray-600 hover:border-white"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="mx-2">
                            <Link
                                href="/login"
                                className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
                        />
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Header;
