"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useSearch } from "@/app/contexts/SearchContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
    const { auth } = useAuth();
    const { fetchSearchResults } = useSearch();
    const [input, setInput] = useState("");
    const router = useRouter();

    const isLoggedIn = !!auth?.firstName;

    const handleSearch = (e) => {
        e.preventDefault();
        fetchSearchResults(input);
        router.push("/search-results");
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
                        <div className="text-white mx-4">
                            <span className="font-bold">Welcome,</span> {auth.firstName}
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
