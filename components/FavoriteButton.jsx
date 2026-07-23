"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useToast } from "@/app/contexts/ToastContext";
import { useFavorites } from "@/app/contexts/FavoritesContext";

// overlay: icon-only heart for movie cards. Labeled button otherwise.
// Favorited state comes from FavoritesContext (loaded once), so hearts stay
// filled across the app without a fetch per card.
const FavoriteButton = ({ movie, overlay = false }) => {
    const { auth } = useAuth();
    const { toast } = useToast();
    const { toggle, isFav } = useFavorites();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const favorited = isFav(movie.id);

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!auth?._id) {
            router.push("/login");
            return;
        }
        setLoading(true);
        try {
            const { favorited: next } = await toggle(movie);
            toast(next ? "Added to favorites" : "Removed from favorites");
        } catch (error) {
            toast(error.message || "Something went wrong.", "error");
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
