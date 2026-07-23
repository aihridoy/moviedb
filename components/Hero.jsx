"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        fetch("/api/movies/trending")
            .then((r) => r.json())
            .then((d) => setMovies((d.results || []).filter((m) => m.backdrop_path && m.overview).slice(0, 6)))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (movies.length < 2) return;
        const t = setInterval(() => setIdx((i) => (i + 1) % movies.length), 7000);
        return () => clearInterval(t);
    }, [movies]);

    if (movies.length === 0) return <div className="h-screen bg-zinc-900 animate-pulse" />;

    const movie = movies[idx];

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Stacked slides cross-fade into each other (no fade-to-black). */}
            {movies.map((m, i) => (
                <div
                    key={m.id}
                    className={`hero-slide absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${i === idx ? "opacity-100 hero-slide-active" : "opacity-0"}`}
                >
                    <div
                        className="hero-bg absolute inset-0"
                        style={{
                            backgroundImage: `url("https://image.tmdb.org/t/p/original${m.backdrop_path}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40" />
                </div>
            ))}

            {/* Content shares the page container so it lines up with the rows below. */}
            <div className="absolute inset-x-0 bottom-0">
                <div className="container mx-auto px-4 pb-12 md:pb-16">
                    <div key={idx} className="max-w-2xl">
                        <h1 className="hero-title text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                        <p className="hero-overview text-sm md:text-lg mb-4 line-clamp-3">{movie.overview}</p>
                        <Link
                            href={`/movie/${movie.id}`}
                            className="hero-cta inline-block bg-white text-black px-6 md:px-8 py-2 rounded-lg font-bold hover:bg-opacity-80 transition"
                        >
                            ▶ View Details
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 right-4 md:right-8 flex gap-2">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIdx(i)}
                        aria-label={`Show slide ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-500 ease-out ${i === idx ? "w-6 bg-red-600" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
