'use client'

import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts';

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    // Rehydrate from the httpOnly session cookie so a refresh keeps the user
    // logged in. `loading` stays true until this resolves so gated pages can
    // show a spinner instead of flashing a "sign in" prompt.
    useEffect(() => {
        fetch('/api/me')
            .then((res) => res.json())
            .then((data) => data?.user && setAuth(data.user))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
