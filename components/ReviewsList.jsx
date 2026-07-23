"use client";

import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const ReviewsList = ({ movieId, refreshKey }) => {
    const [data, setData] = useState({ ratings: [], average: 0, count: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetch(`/api/ratings?movieId=${movieId}`)
            .then((res) => res.json())
            .then((d) => active && setData({ ratings: d.ratings || [], average: d.average || 0, count: d.count || 0 }))
            .catch(() => {})
            .finally(() => active && setLoading(false));
        return () => { active = false; };
    }, [movieId, refreshKey]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-500">{data.average || "—"}</div>
                    <div className="text-xs text-gray-400">/ 10</div>
                </div>
                <div className="text-gray-400">
                    {data.count} {data.count === 1 ? "review" : "reviews"}
                </div>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading reviews...</p>
            ) : data.ratings.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first!</p>
            ) : (
                <ul className="space-y-3">
                    {data.ratings.map((r) => (
                        <li key={r._id} className="bg-zinc-900 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{r.userName}</span>
                                <StarRating value={r.rating} readOnly size={16} />
                            </div>
                            {r.reviewText && <p className="text-gray-300 text-sm">{r.reviewText}</p>}
                            <p className="text-xs text-gray-500 mt-2">
                                {new Date(r.createdAt).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewsList;
