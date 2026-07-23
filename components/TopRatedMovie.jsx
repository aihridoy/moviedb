"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MovieRowSkeleton from './MovieRowSkeleton';
import FavoriteButton from './FavoriteButton';

const TopRatedMovie = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch("/api/movies/top-rated");
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

    if (loading) return <MovieRowSkeleton title="Top Rated" />;
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
            <div id="topRatedMovies" className="flex space-x-4 overflow-x-auto pb-4">
                {
                    movies?.map(movie => (
                        <div key={movie.id}
                            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform relative"
                        >
                            <Link href={`/movie/${movie.id}`}>
                                <Image
                                    width={200}
                                    height={300}
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title || "Movie Poster"}
                                    className="w-full rounded-lg"
                                />
                            </Link>
                            <FavoriteButton movie={movie} overlay />
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default TopRatedMovie;