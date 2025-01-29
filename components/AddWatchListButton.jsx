"use client"

import { addToWatchlist, isMovieInWatchlist } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddWatchListButton = ({ movie }) => {
    const { auth } = useAuth()
    const [isAdded, setIsAdded] = useState(false);
    const isLoggedIn = !!auth?.firstName;
    const router = useRouter()
    const addToWatchlistHandler = async () => {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }
        const movieData = {
            userId: auth._id,
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
        }

        try {
            await addToWatchlist(movieData);
            alert("Movie added to Watch List!");
            setIsAdded(true);
        } catch (error) {
            console.error("Error adding movie to Watch List:", error);
            alert(error.message || "Something went wrong.");
        }
    };

    const checkIfMovieIsInWatchlist = async () => {
        if (!auth?._id) return;

        try {
            const isInWatchlist = await isMovieInWatchlist(auth._id, movie.id);
            setIsAdded(isInWatchlist);
        } catch (error) {
            console.error("Error checking watchlist:", error);
        }
    };

    useEffect(() => {
        checkIfMovieIsInWatchlist();
    }, [auth, movie]);

    return (
        <div className="flex">
            <button
                onClick={addToWatchlistHandler}
                disabled={isAdded}
                className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path
                        d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                    />
                    <path d="M12 11l0 6" />
                    <path d="M9 14l6 0" />
                </svg>
                { }
                Add to Watch List
            </button>

            {
                isAdded &&
                <div className="text-center">
                    <button
                        className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 12l5 5l10 -10" />
                            <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                        Added to Wacth List
                    </button>
                </div>
            }
        </div>
    );
};

export default AddWatchListButton;