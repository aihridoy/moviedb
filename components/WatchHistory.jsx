"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { useToast } from "@/app/contexts/ToastContext";
import { removeFromHistory } from "@/app/actions";
import LoadingSpinner from "./LoadingSpinner";

// Groups history items by their watched date (e.g. "24 July 2026").
function groupByDate(items) {
    const groups = {};
    for (const item of items) {
        const key = new Date(item.watchedAt).toLocaleDateString("en-GB", {
            day: "2-digit", month: "long", year: "numeric",
        });
        (groups[key] ||= []).push(item);
    }
    return Object.entries(groups);
}

const WatchHistory = () => {
    const { auth } = useAuth();
    const { toast } = useToast();
    const [data, setData] = useState({ history: [], stats: null });
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);
        fetch("/api/history")
            .then((res) => res.json())
            .then((d) => setData({ history: d.history || [], stats: d.stats || null }))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (auth?._id) load();
        else setLoading(false);
    }, [auth, load]);

    const handleRemove = async (movieId) => {
        try {
            await removeFromHistory(movieId);
            load();
            toast("Removed from history");
        } catch (error) {
            toast(error.message || "Failed to remove.", "error");
        }
    };

    if (!auth?._id) {
        return (
            <p className="text-center text-gray-400 mt-8">
                <Link href="/login" className="text-red-600 hover:underline">Sign in</Link> to see your watch history.
            </p>
        );
    }

    if (loading) return <div className="flex justify-center min-h-[40vh] items-center"><LoadingSpinner /></div>;

    if (data.history.length === 0) {
        return <p className="text-center text-xl text-gray-500 mt-8">No watch history yet.</p>;
    }

    const { stats } = data;

    return (
        <div className="space-y-8">
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-900 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-red-600">{stats.totalWatched}</div>
                        <div className="text-gray-400 text-sm">Movies watched</div>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-yellow-500">{stats.averageRating || "—"}</div>
                        <div className="text-gray-400 text-sm">Your average rating</div>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-4">
                        <div className="text-gray-400 text-sm mb-2 text-center">Top genres</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {stats.topGenres.length
                                ? stats.topGenres.map((g) => (
                                    <span key={g.name} className="px-2 py-1 bg-zinc-800 rounded-full text-xs">
                                        {g.name} ({g.count})
                                    </span>
                                ))
                                : <span className="text-gray-500 text-xs">—</span>}
                        </div>
                    </div>
                </div>
            )}

            {groupByDate(data.history).map(([date, items]) => (
                <div key={date}>
                    <h3 className="text-gray-400 font-semibold mb-3 border-b border-zinc-800 pb-1">{date}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {items.map((movie) => (
                            <div key={movie._id} className="relative group">
                                <Link href={`/movie/${movie.movieId}`}>
                                    <Image
                                        width={200}
                                        height={300}
                                        src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
                                        alt={movie.title}
                                        className="w-full rounded-lg object-cover"
                                    />
                                    <p className="text-sm mt-1 truncate">{movie.title}</p>
                                </Link>
                                <button
                                    onClick={() => handleRemove(movie.movieId)}
                                    className="absolute top-2 right-2 bg-black/70 text-white w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    aria-label="Remove from history"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WatchHistory;
