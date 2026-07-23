"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import { GENRES } from "@/lib/genres";

const RandomPicker = () => {
    const [genre, setGenre] = useState("");
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shown, setShown] = useState(false);

    const pick = async () => {
        setLoading(true);
        setShown(false);
        try {
            const res = await fetch(`/api/random${genre ? `?genre=${genre}` : ""}`);
            const data = await res.json();
            setMovie(data.movie || null);
        } catch {
            setMovie(null);
        } finally {
            setLoading(false);
        }
    };

    // Trigger the fade/scale reveal once a movie is set.
    useEffect(() => {
        if (!movie) return;
        const id = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(id);
    }, [movie]);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="bg-zinc-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            >
                <option value="">Any genre</option>
                {GENRES.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </select>

            <button
                onClick={pick}
                disabled={loading}
                className={`bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-red-700 transition ${loading ? "cursor-not-allowed opacity-70" : ""}`}
            >
                🎲 I&apos;m Feeling Lucky
            </button>

            {loading && <LoadingSpinner />}

            {!loading && movie && (
                <div
                    className={`transition duration-500 ${shown ? "opacity-100 scale-100" : "opacity-0 scale-95"} w-full`}
                >
                    <div className="flex flex-col md:flex-row gap-6 bg-zinc-900 rounded-lg p-6">
                        <Image
                            width={200}
                            height={300}
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title || "Movie Poster"}
                            className="w-48 rounded-lg self-center md:self-start"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                            <p className="text-gray-400 text-sm mb-4">{movie.release_date}</p>
                            <p className="text-gray-300 mb-4 line-clamp-6">{movie.overview}</p>
                            <div className="flex gap-3">
                                <Link href={`/movie/${movie.id}`} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
                                    View Details
                                </Link>
                                <button onClick={pick} className="bg-zinc-700 px-4 py-2 rounded hover:bg-zinc-800 transition">
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RandomPicker;
