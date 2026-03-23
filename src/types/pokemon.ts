// The types File for the Pokemon api data 

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Pokemon {
    id: number;
    name: string;
    url: string;
    imageUrl: string;
    types?: PokemonType[];
}

export interface PokeAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}
