"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useToast } from "@/app/contexts/ToastContext";
import { markAsWatched } from "@/app/actions";

const MarkAsWatchedButton = ({ movie }) => {
    const { auth } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (!auth?._id) {
            router.push("/login");
            return;
        }
        setLoading(true);
        try {
            await markAsWatched({
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                genres: (movie.genres || []).map((g) => g.name),
            });
            setDone(true);
            toast("Marked as watched");
        } catch (error) {
            toast(error.message || "Something went wrong.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${done ? "bg-black/40 text-green-500" : "bg-black/40"}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5l10 -10" />
            </svg>
            {done ? "Watched" : loading ? "Saving..." : "Mark as Watched"}
        </button>
    );
};

export default MarkAsWatchedButton;
