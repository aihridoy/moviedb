"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

const SearchMovie = ({ closeModal, onSelectMovie, setId }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const fetchMovies = useCallback(
        debounce(async (query) => {
            if (!query) {
                fetchTrendingMovies();
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`/api/movies/search?query=${query}`);
                const data = await response.json();
                setSearchResults(data.results || []);
            } catch (error) {
                console.error("Error searching movies:", error);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    const fetchTrendingMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/movies/now-playing");
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error("Error fetching trending movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingMovies();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchMovies(query);
    };

    const handleSelectMovie = (movie) => {
        onSelectMovie(movie);
        setId(movie.id);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Search Movie</h2>
                    <button onClick={closeModal} className="text-gray-400 hover:text-white">
                        ✕
                    </button>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Type movie name..."
                    className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                        {searchResults.map((movie) => (
                            <div
                                key={movie.id}
                                className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                                onClick={() => handleSelectMovie(movie.id)}
                            >
                                <Image
                                    width={200}
                                    height={300}
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-16 h-24 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-bold">{movie.title}</h3>
                                    <p className="text-sm text-gray-400">{movie.release_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400">No movies found.</div>
                )}
            </div>
        </div>
    );
};

export default SearchMovie;
