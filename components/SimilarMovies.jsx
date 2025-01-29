"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SimilarMovies = ({ movieId }) => {
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                const response = await fetch(
                    `/api/movies/${movieId}/similar`
                );
                const data = await response.json();
                setSimilarMovies(data.results);
            } catch (error) {
                console.error("Error fetching similar movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarMovies();
    }, [movieId]);

    return (
        <div className="container mx-auto px-4 py-8 mt-[250px]">
            <h2 className="text-2xl font-bold mb-4">More Like This</h2>

            {loading ? (
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-48 h-[288px] rounded-lg bg-zinc-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            ) : (
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {similarMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
                        >
                            <Link href={`/movie/${movie.id}`}>
                                <Image
                                    width={200}
                                    height={300}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-[288px] rounded-lg object-cover"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SimilarMovies;
