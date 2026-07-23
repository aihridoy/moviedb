"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecentlyViewed } from "@/app/hooks/useRecentlyViewed";

// With `track`, records a visit and renders nothing (used on the movie page).
// Without it, renders the horizontal recently-viewed strip (used on home).
const RecentlyViewed = ({ track }) => {
    const { items, add } = useRecentlyViewed();

    useEffect(() => {
        if (track) add(track);
    }, [track, add]);

    if (track) return null;
    if (items.length === 0) return null;

    return (
        <section className="container mx-auto px-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {items.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0 w-40 cursor-pointer hover:scale-105 transition-transform">
                        <Link href={`/movie/${movie.id}`}>
                            <Image
                                width={200}
                                height={300}
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title || "Movie Poster"}
                                className="w-full rounded-lg"
                            />
                            <p className="text-sm mt-1 truncate">{movie.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentlyViewed;
