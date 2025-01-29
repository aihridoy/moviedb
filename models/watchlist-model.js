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
        unique: true,
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

export const Watchlist =
    mongoose.models?.watchlists ?? mongoose.model("watchlists", watchlistSchema);



