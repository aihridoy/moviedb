import mongoose, { Schema } from "mongoose";

const watchlistSchema = new Schema({
    userId: {
        type: String,
        ref: "users",
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    posterPath: {
        type: String,
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

// One entry per (user, movie) — was previously unique on movieId alone,
// which wrongly blocked a second user from saving the same movie.
watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export const Watchlist =
    mongoose.models?.watchlists ?? mongoose.model("watchlists", watchlistSchema);



