"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/app/hooks/useAuth";
import { useToast } from "@/app/contexts/ToastContext";
import { useFavorites } from "@/app/contexts/FavoritesContext";

export default function FavoritesPage() {
    const { auth, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const { toggle } = useFavorites();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        setLoading(true);
        fetch("/api/favorites")
            .then((res) => res.json())
            .then((d) => setFavorites(d.favorites || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (authLoading) return;
        if (auth?._id) load();
        else setLoading(false);
    }, [auth, authLoading]);

    const handleRemove = async (movie) => {
        try {
            await toggle({ id: movie.movieId, title: movie.title, poster_path: movie.posterPath });
            setFavorites((prev) => prev.filter((f) => f.movieId !== movie.movieId));
            toast("Removed from favorites");
        } catch (error) {
            toast(error.message || "Failed to remove.", "error");
        }
    };

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

                {authLoading || (auth?._id && loading) ? (
                    <div className="flex justify-center min-h-[40vh] items-center"><LoadingSpinner /></div>
                ) : !auth?._id ? (
                    <p className="text-center text-gray-400">
                        <Link href="/login" className="text-red-600 hover:underline">Sign in</Link> to see your favorites.
                    </p>
                ) : favorites.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">No favorites yet.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {favorites.map((movie) => (
                            <div key={movie._id} className="relative group">
                                <Link href={`/movie/${movie.movieId}`}>
                                    <Image
                                        width={200}
                                        height={300}
                                        src={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
                                        alt={movie.title}
                                        className="w-full rounded-lg object-cover"
                                    />
                                    <p className="text-sm mt-1 truncate">{movie.title}</p>
                                </Link>
                                <button
                                    onClick={() => handleRemove(movie)}
                                    className="absolute top-2 right-2 bg-black/70 text-white w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    aria-label="Remove from favorites"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
