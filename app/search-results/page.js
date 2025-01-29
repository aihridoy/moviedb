/* eslint-disable react/no-unescaped-entities */
"use client"

import { useSearch } from "@/app/contexts/SearchContext";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchResultsPage = () => {
    const { searchQuery, searchResults } = useSearch();
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        Search Results for "{searchQuery}"
                    </h1>
                    <p className="text-gray-400">
                        Found {searchResults.length} results
                    </p>
                </div>

                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchResults.map((movie) => (
                            <Link
                                key={movie.id}
                                href={`/movie/${movie.id}`}
                                className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                            >
                                <Image
                                    width={500}
                                    height={600}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full aspect-[2/3] object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold mb-2">{movie.title}</h3>
                                    <div className="flex justify-between text-sm text-gray-400">
                                        <span>{movie.release_date?.split("-")[0]}</span>
                                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No results found. Try another search.</p>
                )}
            </main>
        </>
    );
};

export default SearchResultsPage;
