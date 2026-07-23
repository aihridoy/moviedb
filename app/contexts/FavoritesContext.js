"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { toggleFavorite as toggleAction } from "@/app/actions";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const { auth } = useAuth();
    const [ids, setIds] = useState(new Set());

    // Load the user's favorite movie ids once — every heart + the nav badge
    // read from this instead of fetching per card.
    const refresh = useCallback(() => {
        if (!auth?._id) {
            setIds(new Set());
            return;
        }
        fetch("/api/favorites")
            .then((r) => r.json())
            .then((d) => setIds(new Set((d.favorites || []).map((f) => String(f.movieId)))))
            .catch(() => {});
    }, [auth]);

    useEffect(() => { refresh(); }, [refresh]);

    const toggle = useCallback(async (movie) => {
        const res = await toggleAction({ movieId: movie.id, title: movie.title, posterPath: movie.poster_path });
        setIds((prev) => {
            const next = new Set(prev);
            res.favorited ? next.add(String(movie.id)) : next.delete(String(movie.id));
            return next;
        });
        return res;
    }, []);

    const isFav = useCallback((id) => ids.has(String(id)), [ids]);

    return (
        <FavoritesContext.Provider value={{ count: ids.size, toggle, isFav, refresh }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => useContext(FavoritesContext);
