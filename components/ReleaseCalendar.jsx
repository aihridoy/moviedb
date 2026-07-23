"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ReleaseCalendar = () => {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("calendar");

    useEffect(() => {
        setLoading(true);
        fetch(`/api/calendar?year=${year}&month=${month}`)
            .then((res) => res.json())
            .then((d) => setMovies(d.results || []))
            .catch(() => setMovies([]))
            .finally(() => setLoading(false));
    }, [year, month]);

    const prev = () => (month === 1 ? (setYear((y) => y - 1), setMonth(12)) : setMonth((m) => m - 1));
    const next = () => (month === 12 ? (setYear((y) => y + 1), setMonth(1)) : setMonth((m) => m + 1));

    // Group movies by day-of-month (guard against stray dates outside the month).
    const byDay = {};
    for (const m of movies) {
        const [y, mo, d] = (m.release_date || "").split("-").map(Number);
        if (y === year && mo === month && d) (byDay[d] ||= []).push(m);
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstWeekday = new Date(year, month - 1, 1).getDay();
    const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={prev} className="bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700">‹</button>
                    <span className="text-xl font-bold w-48 text-center">{MONTHS[month - 1]} {year}</span>
                    <button onClick={next} className="bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700">›</button>
                </div>
                <button
                    onClick={() => setView((v) => (v === "calendar" ? "list" : "calendar"))}
                    className="bg-zinc-800 px-4 py-1 rounded hover:bg-zinc-700"
                >
                    {view === "calendar" ? "List view" : "Calendar view"}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center min-h-[40vh] items-center"><LoadingSpinner /></div>
            ) : view === "calendar" ? (
                <div className="grid grid-cols-7 gap-1">
                    {WEEKDAYS.map((w) => (
                        <div key={w} className="text-center text-gray-400 text-sm font-semibold py-2">{w}</div>
                    ))}
                    {cells.map((day, i) => {
                        const dayMovies = day ? (byDay[day] || []) : [];
                        const isToday = day && isCurrentMonth && day === today.getDate();
                        return (
                            <div
                                key={i}
                                className={`min-h-[96px] rounded p-1 text-xs ${dayMovies.length ? "bg-zinc-900" : "bg-zinc-900/40"} ${isToday ? "ring-2 ring-red-600" : ""}`}
                            >
                                {day && (
                                    <>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={isToday ? "text-red-500 font-bold" : "text-gray-400"}>{day}</span>
                                            {dayMovies.length > 0 && (
                                                <span className="text-[10px] text-gray-500">{dayMovies.length} 🎬</span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {dayMovies.slice(0, 3).map((m) => (
                                                <Link key={m.id} href={`/movie/${m.id}`} title={m.title}>
                                                    <Image
                                                        width={40}
                                                        height={60}
                                                        src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                                                        alt={m.title}
                                                        className="w-8 rounded hover:ring-1 hover:ring-white"
                                                    />
                                                </Link>
                                            ))}
                                            {dayMovies.length > 3 && (
                                                <span className="text-gray-500 self-center">+{dayMovies.length - 3}</span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <ul className="space-y-2">
                    {movies.length === 0 ? (
                        <p className="text-gray-500">No releases this month.</p>
                    ) : movies.map((m) => (
                        <li key={m.id}>
                            <Link href={`/movie/${m.id}`} className="flex items-center gap-4 bg-zinc-900 rounded-lg p-2 hover:bg-zinc-800">
                                <Image
                                    width={40}
                                    height={60}
                                    src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                                    alt={m.title}
                                    className="w-10 rounded"
                                />
                                <div>
                                    <p className="font-semibold">{m.title}</p>
                                    <p className="text-sm text-gray-400">{m.release_date}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReleaseCalendar;
