"use client";

import { GENRES, LANGUAGES } from "@/lib/genres";

// Controlled filter sidebar. `values` is the current filter state; `onChange`
// receives a patch to merge. `values.genres` is an array of genre id strings.
const MovieFilters = ({ values, onChange, onReset }) => {
    const toggleGenre = (id) => {
        const set = new Set(values.genres || []);
        set.has(String(id)) ? set.delete(String(id)) : set.add(String(id));
        onChange({ genres: [...set] });
    };

    return (
        <aside className="bg-zinc-900 rounded-lg p-4 space-y-6 w-full md:w-64 flex-shrink-0">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={onReset} className="text-xs text-red-500 hover:underline">Reset</button>
            </div>

            <div>
                <h3 className="text-sm text-gray-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                    {GENRES.map((g) => {
                        const active = (values.genres || []).includes(String(g.id));
                        return (
                            <button
                                key={g.id}
                                onClick={() => toggleGenre(g.id)}
                                className={`px-2 py-1 rounded-full text-xs ${active ? "bg-red-600 text-white" : "bg-zinc-800 text-gray-300"}`}
                            >
                                {g.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-sm text-gray-400 mb-2">Year</h3>
                <div className="flex items-center gap-2">
                    <input type="number" placeholder="From" value={values.yearMin || ""}
                        onChange={(e) => onChange({ yearMin: e.target.value })}
                        className="w-full bg-zinc-800 text-white px-2 py-1 rounded text-sm" />
                    <span className="text-gray-500">–</span>
                    <input type="number" placeholder="To" value={values.yearMax || ""}
                        onChange={(e) => onChange({ yearMax: e.target.value })}
                        className="w-full bg-zinc-800 text-white px-2 py-1 rounded text-sm" />
                </div>
            </div>

            <div>
                <h3 className="text-sm text-gray-400 mb-2">
                    Minimum rating: {values.ratingMin || 0}
                </h3>
                <input type="range" min="0" max="10" step="0.5" value={values.ratingMin || 0}
                    onChange={(e) => onChange({ ratingMin: e.target.value })}
                    className="w-full accent-red-600" />
            </div>

            <div>
                <h3 className="text-sm text-gray-400 mb-2">Language</h3>
                <select value={values.language || ""}
                    onChange={(e) => onChange({ language: e.target.value })}
                    className="w-full bg-zinc-800 text-white px-2 py-1 rounded text-sm">
                    <option value="">Any</option>
                    {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
            </div>

            <div>
                <h3 className="text-sm text-gray-400 mb-2">Runtime (min)</h3>
                <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" value={values.runtimeMin || ""}
                        onChange={(e) => onChange({ runtimeMin: e.target.value })}
                        className="w-full bg-zinc-800 text-white px-2 py-1 rounded text-sm" />
                    <span className="text-gray-500">–</span>
                    <input type="number" placeholder="Max" value={values.runtimeMax || ""}
                        onChange={(e) => onChange({ runtimeMax: e.target.value })}
                        className="w-full bg-zinc-800 text-white px-2 py-1 rounded text-sm" />
                </div>
            </div>
        </aside>
    );
};

export default MovieFilters;
