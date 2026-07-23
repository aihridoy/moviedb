"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import ExportWatchlist from "@/components/ExportWatchlist";
import { useAuth } from "@/app/hooks/useAuth";

export default function WatchlistPage() {
    const { auth, loading: authLoading } = useAuth();
    const [watchlists, setWatchlists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!auth?._id) {
            setLoading(false);
            return;
        }
        setLoading(true);
        fetch("/api/watchlists", { cache: "no-store" })
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setWatchlists(Array.isArray(data) ? data : []))
            .catch((err) => console.error("Error fetching watchlists:", err))
            .finally(() => setLoading(false));
    }, [auth, authLoading]);

    const busy = authLoading || (auth?._id && loading);

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-bold text-center mb-8">Watchlist</h1>

                {busy ? (
                    <div className="flex items-center justify-center min-h-[40vh]">
                        <LoadingSpinner />
                    </div>
                ) : !auth?._id ? (
                    <p className="text-center text-gray-400">
                        <Link href="/login" className="text-red-600 hover:underline">Sign in</Link> to see your watchlist.
                    </p>
                ) : watchlists.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">
                        <span className="block text-2xl font-semibold text-red-600">No movie in watch list!</span>
                    </p>
                ) : (
                    <>
                        <ExportWatchlist watchlist={watchlists} />
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {watchlists.map((movie) => (
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
                    </>
                )}
            </main>
        </>
    );
}
