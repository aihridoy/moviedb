/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white">
            <div className="text-center">
                <Image
                    src="/not-found.jpg"
                    alt="404 Illustration"
                    width={400}
                    height={400}
                    className="mx-auto"
                />
                <button
                    onClick={handleBackToHome}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
