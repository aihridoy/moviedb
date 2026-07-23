'use client'

import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts';

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    // Rehydrate from the httpOnly session cookie so a refresh keeps the user logged in.
    useEffect(() => {
        fetch('/api/me')
            .then((res) => res.json())
            .then((data) => data?.user && setAuth(data.user))
            .catch(() => {});
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
