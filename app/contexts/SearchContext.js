"use client";

import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const fetchSearchResults = async (query) => {
        setSearchQuery(query);
        if (!query) return setSearchResults([]);

        const response = await fetch(
            `/api/movies/search?query=${query}`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
    };

    return (
        <SearchContext.Provider
            value={{ searchQuery, searchResults, fetchSearchResults }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
