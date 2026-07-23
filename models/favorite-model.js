import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
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
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

favoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export const Favorite =
    mongoose.models?.favorites ?? mongoose.model("favorites", favoriteSchema);
