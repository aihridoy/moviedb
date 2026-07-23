"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { submitRating } from "@/app/actions";
import StarRating from "./StarRating";

const MAX = 1000;

const ReviewForm = ({ movieId, initialRating, onSubmitted }) => {
    const { auth, loading: authLoading } = useAuth();
    const [rating, setRating] = useState(initialRating?.rating || 0);
    const [reviewText, setReviewText] = useState(initialRating?.reviewText || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (authLoading) return null;

    if (!auth?._id) {
        return (
            <div className="bg-zinc-900 rounded-lg p-4 text-gray-400">
                <Link href="/login" className="text-red-600 hover:underline">Sign in</Link> to rate and review this movie.
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!rating) {
            setError("Please pick a rating.");
            return;
        }
        setLoading(true);
        try {
            await submitRating({ movieId, rating, reviewText });
            onSubmitted?.();
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-bold">{initialRating ? "Update your review" : "Rate this movie"}</h3>
            <StarRating value={rating} onChange={setRating} />
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value.slice(0, MAX))}
                placeholder="Write a review (optional)..."
                rows={4}
                className="w-full bg-zinc-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
            />
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{reviewText.length}/{MAX}</span>
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    );
};

export default ReviewForm;
