import { useCallback, useEffect, useState } from "react";

const KEY = "recentlyViewed";
const MAX = 20;

function read() {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
}

// Last 20 viewed movies (id/title/poster), persisted in localStorage.
export function useRecentlyViewed() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(read());
    }, []);

    const add = useCallback((movie) => {
        if (!movie?.id) return;
        const entry = { id: movie.id, title: movie.title, poster_path: movie.poster_path };
        const next = [entry, ...read().filter((m) => m.id !== entry.id)].slice(0, MAX);
        localStorage.setItem(KEY, JSON.stringify(next));
        setItems(next);
    }, []);

    return { items, add };
}
