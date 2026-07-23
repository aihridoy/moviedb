import mongoose, { Schema } from "mongoose";

const historySchema = new Schema({
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
        default: "",
    },
    genres: {
        type: [String],
        default: [],
    },
    watchedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// One entry per (user, movie); re-watching updates watchedAt.
historySchema.index({ userId: 1, movieId: 1 }, { unique: true });
historySchema.index({ userId: 1, watchedAt: -1 });

export const History =
    mongoose.models?.history ?? mongoose.model("history", historySchema);
