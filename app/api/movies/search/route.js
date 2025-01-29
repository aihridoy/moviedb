export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
        return Response.json({ error: "Query parameter is required" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&language=en-US`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch movie search results");
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Error fetching movie search results:", error);
        return Response.json({ error: "Failed to fetch movie search results" }, { status: 500 });
    }
}
