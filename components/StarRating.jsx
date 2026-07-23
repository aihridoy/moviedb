"use client";

import { useState } from "react";

// 10-star rating. Interactive when onChange is passed; display-only otherwise.
const StarRating = ({ value = 0, onChange, readOnly = false, size = 24 }) => {
    const [hover, setHover] = useState(0);
    const active = hover || value;

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                    key={n}
                    type="button"
                    disabled={readOnly}
                    onClick={() => onChange?.(n)}
                    onMouseEnter={() => !readOnly && setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    className={readOnly ? "cursor-default" : "cursor-pointer"}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill={n <= active ? "#eab308" : "none"}
                        stroke="#eab308"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                    </svg>
                </button>
            ))}
            {value > 0 && <span className="ml-2 text-sm text-gray-400">{value}/10</span>}
        </div>
    );
};

export default StarRating;
