"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";

// Composes the rating form + reviews list and coordinates their refresh.
const MovieReviews = ({ movieId }) => {
    const { auth } = useAuth();
    const [refreshKey, setRefreshKey] = useState(0);
    const [myRating, setMyRating] = useState(null);

    useEffect(() => {
        if (!auth?._id) return;
        fetch(`/api/ratings/${movieId}`)
            .then((res) => res.json())
            .then((d) => setMyRating(d.rating || null))
            .catch(() => {});
    }, [auth, movieId, refreshKey]);

    return (
        <section className="container mx-auto px-4 py-8 space-y-6">
            <h2 className="text-2xl font-bold">Ratings &amp; Reviews</h2>
            <ReviewForm
                key={myRating?._id || "new"}
                movieId={movieId}
                initialRating={myRating}
                onSubmitted={() => setRefreshKey((k) => k + 1)}
            />
            <ReviewsList movieId={movieId} refreshKey={refreshKey} />
        </section>
    );
};

export default MovieReviews;
