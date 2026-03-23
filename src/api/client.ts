import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000, // Drop the request if it takes longer than 10 seconds
});