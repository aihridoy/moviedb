"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function apply(theme) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme") || "dark";
        setTheme(saved);
        apply(saved);
    }, []);

    const toggle = () => {
        setTheme((prev) => {
            const next = prev === "dark" ? "light" : "dark";
            localStorage.setItem("theme", next);
            apply(next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
