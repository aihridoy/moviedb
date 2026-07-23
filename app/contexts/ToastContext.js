"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ToastContext = createContext();
let counter = 0;

const COLORS = { success: "bg-green-600", error: "bg-red-600", info: "bg-zinc-700" };

function ToastItem({ message, type, leaving }) {
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const visible = shown && !leaving;

    return (
        <div
            className={`${COLORS[type] || COLORS.success} text-white px-4 py-3 rounded-lg shadow-xl transition-all duration-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
        >
            {message}
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

    const toast = useCallback((message, type = "success") => {
        const id = ++counter;
        setToasts((t) => [...t, { id, message, type, leaving: false }]);
        setTimeout(() => setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x))), 2600);
        setTimeout(() => remove(id), 3000);
    }, [remove]);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
                {toasts.map((t) => <ToastItem key={t.id} {...t} />)}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
