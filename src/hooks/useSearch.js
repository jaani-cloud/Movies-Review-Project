import { useState, useMemo } from "react";

export function useSearch(items, searchKey = "name") {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = useMemo(() => {
        if (!searchQuery) return items;

        return items.filter((item) =>
            item[searchKey].toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [items, searchQuery, searchKey]);

    return {
        searchQuery,
        setSearchQuery,
        filteredItems
    }
}