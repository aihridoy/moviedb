"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch("/api/movies/trending");
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    if (loading) return <LoadingSpinner />;
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
                {
                    movies?.map(movie => (
                        <div key={movie.id}
                            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
                        >
                            <Link href={`/movie/${movie.id}`}>
                                <Image
                                    width={200}
                                    height={300}
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title || "Movie Poster"}
                                    className="w-full rounded-lg object-contain"
                                />
                                <div className="mt-2">
                                    <h3 className="text-light text-sm font-bold truncate">{movie.title}</h3>
                                    <p className="text-primary text-xs">{movie.release_date}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default TrendingMovies;