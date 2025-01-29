"use client";

import React, { useState } from "react";
import Image from "next/image";
import SearchMovie from "@/components/SearchMovie";
import Header from "@/components/Header";

const CompareMovies = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieSlots, setMovieSlots] = useState([]);
    const [id, setId] = useState(null);
    const [currentSlotIndex, setCurrentSlotIndex] = useState(null);

    const openModal = (index) => {
        setCurrentSlotIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSlotIndex(null);
    };

    const addMovieSlot = () => {
        setMovieSlots((prevSlots) => [...prevSlots, null]);
    };

    const removeMovieSlot = (index) => {
        setMovieSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
    };

    const handleSelectMovie = async (movieId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${movieId}`, {
                next: { revalidate: 10 },
            });
            const data = await res.json();
            setMovieSlots((prevSlots) =>
                prevSlots.map((slot, index) =>
                    index === currentSlotIndex ? data : slot
                )
            );
            closeModal();
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const formatBudget = (budget) => {
        if (budget >= 1000000) {
            return `$${(budget / 1000000).toFixed(1)}M`;
        } else if (budget >= 1000) {
            return `$${(budget / 1000).toFixed(1)}K`;
        }
        return `$${budget}`;
    };


    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Compare Movies</h1>
                    <button
                        onClick={addMovieSlot}
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Add Movie +
                    </button>
                </div>

                {movieSlots.length === 0 && <div className="flex justify-center items-center">
                    <p className="text-center text-xl text-gray-500 mt-8">
                        <span className="block text-2xl font-semibold text-red-600">No movies to compare</span>
                        <span className="block text-sm text-gray-400">Please add movies to your list to start comparing.</span>
                    </p>
                </div>}

                <div className="grid gap-6 md:grid-cols-2">
                    {movieSlots.map((slot, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]"
                        >
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => removeMovieSlot(index)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            {slot ? (
                                <div className="grid grid-cols-5 gap-8">
                                    <div className="col-span-2 h-full">
                                        <Image
                                            width={200}
                                            height={300}
                                            src={`https://image.tmdb.org/t/p/original${slot.poster_path}`}
                                            alt={slot.title}
                                            className="w-full rounded-lg mb-4 object-contain max-h-full"
                                        />
                                        <h2 className="text-xl font-bold mb-2 text-center">
                                            {slot.title}
                                        </h2>
                                    </div>
                                    <div className="w-full space-y-4 col-span-3">
                                        <div className="bg-zinc-800 p-3 rounded">
                                            <span className="text-gray-400">Rating:</span>
                                            <span className="float-right">{slot.vote_average}/10</span>
                                        </div>
                                        <div className="bg-zinc-800 p-3 rounded">
                                            <span className="text-gray-400">Release Year:</span>
                                            <span className="float-right">
                                                {new Date(slot.release_date).getFullYear()}
                                            </span>
                                        </div>
                                        <div className="bg-zinc-800 p-3 rounded">
                                            <span className="text-gray-400">Runtime:</span>
                                            <span className="float-right">{slot.runtime} min</span>
                                        </div>
                                        <div className="bg-zinc-800 p-3 rounded">
                                            <span className="text-gray-400">Budget:</span>
                                            <span className="float-right">{formatBudget(slot.budget)}</span>
                                        </div>
                                        <div className="bg-zinc-800 p-3 rounded">
                                            <span className="text-gray-400">Revenue:</span>
                                            <span className="float-right">{formatBudget(slot.revenue)}</span>
                                        </div>
                                        <div className="bg-zinc-800 p-3 rounded">
                                            <span className="text-gray-400">Genres:</span>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {slot?.genres?.map((genre) => (
                                                    <span
                                                        key={genre.id}
                                                        className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-grow flex flex-col items-center justify-center">
                                    <button
                                        onClick={() => openModal(index)}
                                        className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                                    >
                                        Select Movie
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {isModalOpen && (
                <SearchMovie
                    closeModal={closeModal}
                    onSelectMovie={handleSelectMovie}
                    setId={setId}
                />
            )}
        </>
    );
};

export default CompareMovies;
