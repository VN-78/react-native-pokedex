import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Pokemon } from '../../../types/pokemon';

// 1. The Dictionary Pattern for Tailwind Colors
// This ensures the compiler sees the full class names.
const typeColors: Record<string, string> = {
    normal: 'bg-stone-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-emerald-500',
    electric: 'bg-yellow-400',
    ice: 'bg-cyan-300',
    fighting: 'bg-orange-600',
    poison: 'bg-purple-500',
    ground: 'bg-amber-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-700',
    ghost: 'bg-violet-600',
    dragon: 'bg-indigo-600',
    dark: 'bg-slate-700',
    steel: 'bg-slate-400',
    fairy: 'bg-pink-300',
};

interface PokemonCardProps {
    pokemon: Pokemon;
    onPress?: () => void;
}

export const PokemonCard = ({ pokemon, onPress }: PokemonCardProps) => {
    // Format ID to look like #001
    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

    // Grab the primary type to color the whole card. Fallback to normal if undefined.
    const primaryType = pokemon.types?.[0]?.type.name || 'normal';
    const cardColorClass = typeColors[primaryType] || typeColors.normal;

    return (
        <Pressable
            onPress={onPress}
            // active:scale-95 and active:opacity-90 give it a physical button feel
            className={`flex-row p-4 mb-3 rounded-2xl items-center shadow-sm active:scale-95 active:opacity-90 transition-all ${cardColorClass}`}
        >
            {/* Left Side: The Image */}
            <View className="bg-white/30 rounded-full p-2 mr-4">
                <Image
                    source={{ uri: pokemon.imageUrl }}
                    className="w-20 h-20"
                    contentFit="contain"
                    transition={200}
                />
            </View>

            {/* Right Side: Details */}
            <View className="flex-1 justify-center">
                {/* ID */}
                <Text className="text-black/50 font-black text-sm text-right mb-1">
                    {formattedId}
                </Text>

                {/* Name */}
                <Text className="text-white font-bold text-2xl capitalize tracking-wide mb-2">
                    {pokemon.name}
                </Text>

                {/* Type Badges */}
                <View className="flex-row gap-2">
                    {pokemon.types?.map((typeInfo) => (
                        <View
                            key={typeInfo.type.name}
                            className="bg-white/20 px-3 py-1 rounded-full"
                        >
                            <Text className="text-white font-semibold text-xs capitalize">
                                {typeInfo.type.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </Pressable>
    );
};