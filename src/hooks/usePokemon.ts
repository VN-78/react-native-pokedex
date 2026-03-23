import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';
import { Pokemon, PokeAPIResponse } from '../types/pokemon';
import { extractPokemonId, getPokemonImageUrl } from '../utils/helpers';

export const usePokemon = () => {
    const [data, setData] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>('/pokemon?limit=20');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // The core fetch logic
    const fetchPokemon = async (url: string, isInitialLoad: boolean = false) => {
        try {
            if (isInitialLoad) setIsLoading(true);
            else setIsFetchingNextPage(true);
            setError(null);

            // Hit the API
            const response = await apiClient.get<PokeAPIResponse>(url);

            // Transform the raw data into our strict TypeScript interface
            const formattedData: Pokemon[] = response.data.results.map((item) => {
                const id = extractPokemonId(item.url);
                return {
                    id,
                    name: item.name,
                    url: item.url,
                    imageUrl: getPokemonImageUrl(id),
                };
            });

            // Append new data to the existing array (Do not overwrite!)
            setData((prev) => [...prev, ...formattedData]);

            // Save the next page URL provided by the API (or null if at the end)
            // We replace the baseURL so Axios handles it cleanly
            const nextPath = response.data.next
                ? response.data.next.replace('https://pokeapi.co/api/v2', '')
                : null;
            setNextUrl(nextPath);

        } catch (err) {
            setError('Failed to fetch Pokémon data. Check your connection.');
            console.error(err);
        } finally {
            setIsLoading(false);
            setIsFetchingNextPage(false);
        }
    };

    // Initial load when the app starts
    useEffect(() => {
        fetchPokemon('/pokemon?limit=20', true);
    }, []);

    // Function exposed to FlashList's onEndReached
    const fetchNextPage = useCallback(() => {
        // GUARD: If we are already fetching, or there is no next page, do nothing.
        if (isFetchingNextPage || !nextUrl) return;
        fetchPokemon(nextUrl);
    }, [isFetchingNextPage, nextUrl]);

    return { data, isLoading, isFetchingNextPage, error, fetchNextPage };
};