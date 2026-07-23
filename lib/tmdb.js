const BASE = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";

async function tmdb(path, params = {}) {
    const url = new URL(`${BASE}${path}`);
    url.searchParams.set("api_key", process.env.TMDB_API_KEY);
    url.searchParams.set("language", "en-US");
    for (const [k, v] of Object.entries(params)) {
        if (v != null) url.searchParams.set(k, v);
    }

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
        const err = new Error(`TMDB request failed: ${path}`);
        err.status = res.status;
        throw err;
    }
    return res.json();
}

export const getMovie = (id) => tmdb(`/movie/${id}`);
export const getCredits = (id) => tmdb(`/movie/${id}/credits`);
export const getSimilar = (id) => tmdb(`/movie/${id}/similar`);
export const getPopular = (page = 1) => tmdb(`/movie/popular`, { page });
export const getTopRated = (page = 1) => tmdb(`/movie/top_rated`, { page });
export const getNowPlaying = (page = 1) => tmdb(`/movie/now_playing`, { page });
export const getTrending = (page = 1) => tmdb(`/trending/movie/day`, { page });
export const searchMovies = (query, page = 1) => tmdb(`/search/movie`, { query, page });
export const getGenres = () => tmdb(`/genre/movie/list`);
export const discoverMovies = (params = {}) => tmdb(`/discover/movie`, params);
