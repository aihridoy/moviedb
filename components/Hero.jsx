"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [idx, setIdx] = useState(0);
    const [shown, setShown] = useState(true);

    useEffect(() => {
        fetch("/api/movies/trending")
            .then((r) => r.json())
            .then((d) => setMovies((d.results || []).filter((m) => m.backdrop_path && m.overview).slice(0, 6)))
            .catch(() => {});
    }, []);

    // Cross-fade to a movie: fade out, swap, fade back in.
    const goTo = (next) => {
        setShown(false);
        setTimeout(() => {
            setIdx(next);
            setShown(true);
        }, 500);
    };

    useEffect(() => {
        if (movies.length < 2) return;
        const t = setInterval(() => goTo((idx + 1) % movies.length), 6000);
        return () => clearInterval(t);
    }, [movies, idx]);

    const movie = movies[idx];

    if (!movie) return <div className="h-screen bg-zinc-900 animate-pulse" />;

    return (
        <div id="hero" className="relative h-screen overflow-hidden">
            <div
                className={`absolute inset-0 transition-all duration-700 ease-out ${shown ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30" />

            <div className={`absolute bottom-0 left-0 p-12 transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                <p className="text-lg max-w-2xl mb-4 line-clamp-3">{movie.overview}</p>
                <Link
                    href={`/movie/${movie.id}`}
                    className="inline-block bg-white text-black px-8 py-2 rounded-lg font-bold hover:bg-opacity-80"
                >
                    ▶ View Details
                </Link>
            </div>

            <div className="absolute bottom-6 right-8 flex gap-2">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Show slide ${i + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition ${i === idx ? "bg-red-600" : "bg-white/40 hover:bg-white/70"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
