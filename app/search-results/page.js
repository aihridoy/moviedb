"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import MovieFilters from "@/components/MovieFilters";
import LoadingSpinner from "@/components/LoadingSpinner";

const EMPTY = { genres: [], yearMin: "", yearMax: "", ratingMin: "", language: "", runtimeMin: "", runtimeMax: "" };

function buildQueryString(query, filters) {
    const p = new URLSearchParams();
    if (query) p.set("query", query);
    if (filters.genres?.length) p.set("genres", filters.genres.join(","));
    for (const key of ["yearMin", "yearMax", "ratingMin", "language", "runtimeMin", "runtimeMax"]) {
        if (filters[key]) p.set(key, filters[key]);
    }
    return p.toString();
}

function SearchResultsInner() {
    const router = useRouter();
    const params = useSearchParams();

    const query = params.get("query") || "";
    // Initialize filters from the URL once.
    const [filters, setFilters] = useState(() => ({
        ...EMPTY,
        genres: params.get("genres") ? params.get("genres").split(",") : [],
        yearMin: params.get("yearMin") || "",
        yearMax: params.get("yearMax") || "",
        ratingMin: params.get("ratingMin") || "",
        language: params.get("language") || "",
        runtimeMin: params.get("runtimeMin") || "",
        runtimeMax: params.get("runtimeMax") || "",
    }));
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const timer = useRef();

    const qs = useMemo(() => buildQueryString(query, filters), [query, filters]);

    useEffect(() => {
        // Keep the URL in sync (shareable) and debounce the fetch.
        router.replace(`/search-results${qs ? `?${qs}` : ""}`, { scroll: false });

        if (!qs) {
            setResults([]);
            return;
        }

        clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/movies/search?${qs}`);
                const data = await res.json();
                setResults(data.results || []);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer.current);
    }, [qs, router]);

    const patch = (p) => setFilters((f) => ({ ...f, ...p }));
    const reset = () => setFilters(EMPTY);

    return (
        <main className="container mx-auto px-4 pt-24 pb-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    {query ? `Search Results for "${query}"` : "Browse Movies"}
                </h1>
                <p className="text-gray-400">{results.length} results</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <MovieFilters values={filters} onChange={patch} onReset={reset} />

                <div className="flex-1">
                    {loading ? (
                        <div className="flex justify-center min-h-[40vh] items-center"><LoadingSpinner /></div>
                    ) : results.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {results.map((movie) => (
                                <Link
                                    key={movie.id}
                                    href={`/movie/${movie.id}`}
                                    className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                                >
                                    <Image
                                        width={500}
                                        height={600}
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full aspect-[2/3] object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-bold mb-2 truncate">{movie.title}</h3>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>{movie.release_date?.split("-")[0]}</span>
                                            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No results. Try another search or adjust the filters.</p>
                    )}
                </div>
            </div>
        </main>
    );
}

export default function SearchResultsPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="pt-24 text-center text-gray-400">Loading...</div>}>
                <SearchResultsInner />
            </Suspense>
        </>
    );
}
