// app/watchlist/page.js
"use client"; // Mark this as a client component to use React hooks like useState and useEffect

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function WatchlistPage() {
    const [watchlists, setWatchlists] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWatchlists = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watchlists`, {
                    cache: 'no-store'
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch watchlists");
                }
                const data = await res.json();
                setWatchlists(data);
            } catch (err) {
                console.error("Error fetching watchlists:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlists();
    }, []);

    return (
        <>
            <Header />
            {
                watchlists?.length === 0 && <div className="flex justify-center items-center min-h-screen">
                    <p className="text-center text-xl text-gray-500 mt-8">
                        <span className="block text-2xl font-semibold text-red-600">No movie in watch list!</span>
                    </p>
                </div>
            }
            {
                loading ? <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner />
                </div> : <div className="px-4 pt-24">
                    <h1 className="text-3xl font-bold text-center mb-8">Watchlist</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {watchlists?.map((movie) => (
                            <div key={movie._id} className="rounded-lg shadow-xl p-4">
                                <Link href={`/movie/${movie.movieId}`}>
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                        width={500}
                                        height={750}
                                        alt={movie.title}
                                        className="w-full h-auto mb-4 rounded-md"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                                    <p className="text-sm text-gray-400">
                                        Added on: {new Date(movie.addedAt).toLocaleDateString()}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}
