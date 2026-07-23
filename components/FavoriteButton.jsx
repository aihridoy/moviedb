"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { toggleFavorite, isFavorite } from "@/app/actions";

// overlay: icon-only heart for movie cards. Labeled button otherwise.
// checkInitial defaults off for overlays to avoid a fetch per card on grids.
const FavoriteButton = ({ movie, overlay = false, checkInitial = !overlay }) => {
    const { auth } = useAuth();
    const router = useRouter();
    const [favorited, setFavorited] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (checkInitial && auth?._id) {
            isFavorite(movie.id).then(setFavorited).catch(() => {});
        }
    }, [checkInitial, auth, movie.id]);

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!auth?._id) {
            router.push("/login");
            return;
        }
        setLoading(true);
        try {
            const { favorited: next } = await toggleFavorite({
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
            });
            setFavorited(next);
        } catch (error) {
            alert(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const heart = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill={favorited ? "#dc2626" : "none"} stroke={favorited ? "#dc2626" : "currentColor"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );

    if (overlay) {
        return (
            <button
                onClick={handleClick}
                disabled={loading}
                aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 hover:bg-black/80 transition"
            >
                {heart}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"
        >
            {heart}
            {favorited ? "Favorited" : "Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
