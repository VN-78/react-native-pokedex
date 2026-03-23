// PokéAPI doesn't return the ID or image directly in the list endpoint.
// We extract the ID from the URL: "https://pokeapi.co/api/v2/pokemon/1/" -> 1
export const extractPokemonId = (url: string): number => {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
};

// We use the official raw GitHub sprites for high performance
export const getPokemonImageUrl = (id: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};