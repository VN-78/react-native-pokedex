import './global.css'; // Mandatory NativeWind v4 import
import { View, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePokemon } from './src/hooks/usePokemon';
import { FlashList } from '@shopify/flash-list';
import { PokemonCard } from './src/components/molecules/cards/PokemonCard';

export default function App() {
  // 1. We destructure exactly what we need from our custom hook.
  // The moment this component mounts, the hook's useEffect runs the initial fetch.
  const { data, isLoading, isFetchingNextPage, error, fetchNextPage } = usePokemon();

  // 2. Handle the initial loading state (Full screen spinner)
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <ActivityIndicator size="large" color="#34d399" />
        <Text className="mt-4 text-emerald-400 font-bold tracking-widest">
          BOOTING POKÉDEX...
        </Text>
      </View>
    );
  }

  // 3. Handle network errors
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900 p-6">
        <Text className="text-red-500 font-bold text-center text-xl">{error}</Text>
      </View>
    );
  }

  // 4. Render the data
  return (
    <View className="flex-1 bg-slate-900 pt-12">
      <StatusBar style="light" />

      {/* This is where FlashList shines. We pass our data array directly to it.
        When the user scrolls near the bottom (onEndReached), we call fetchNextPage.
      */}
      <View className="flex-1 w-full px-4">
        {/* <PokemonCard
          pokemon={ }
          onPress={}
        /> */}
        <FlashList
          data={data}
          estimatedItemSize={120} // Crucial for FlashList performance!
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}

          // The Pagination Triggers
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5} // Trigger fetch when halfway through the last screen

          // Temporary render item until we hook up the actual PokemonCard
          renderItem={({ item }) => (
            <View className="p-4 mb-2 bg-slate-800 rounded-xl">
              <Text className="text-white font-bold capitalize">{item.name}</Text>
            </View>
          )}

          // Small spinner at the bottom while fetching the next 20 items
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <View className="py-4 items-center">
                <ActivityIndicator color="#34d399" />
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
}