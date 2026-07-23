'use client';

export default function Error({ error, reset }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
            <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
            <p className="text-gray-400">{error?.message || "An unexpected error occurred."}</p>
            <button
                onClick={reset}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Try again
            </button>
        </div>
    );
}
