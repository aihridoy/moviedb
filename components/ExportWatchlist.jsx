"use client";

import { useState } from "react";

const ExportWatchlist = ({ watchlist = [] }) => {
    const [copied, setCopied] = useState(false);

    if (watchlist.length === 0) return null;

    // Same-origin GET — the browser sends the session cookie and downloads the attachment.
    const downloadCsv = () => {
        window.location.href = "/api/watchlist/export";
    };

    const copyList = async () => {
        const text = watchlist
            .map((m) => `${m.title} - ${window.location.origin}/movie/${m.movieId}`)
            .join("\n");
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            alert("Could not copy to clipboard.");
        }
    };

    return (
        <div className="flex gap-3 justify-center mb-6">
            <button onClick={downloadCsv} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                Download CSV
            </button>
            <button onClick={copyList} className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 transition">
                {copied ? "Copied!" : "Copy list"}
            </button>
        </div>
    );
};

export default ExportWatchlist;
