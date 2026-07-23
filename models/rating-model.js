import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    userId: {
        type: String,
        ref: "users",
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [10, "Rating must be at most 10"],
    },
    reviewText: {
        type: String,
        trim: true,
        maxlength: [1000, "Review must be at most 1000 characters"],
        default: "",
    },
}, { timestamps: true });

// One rating per (user, movie); re-submitting updates it.
ratingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export const Rating =
    mongoose.models?.ratings ?? mongoose.model("ratings", ratingSchema);
