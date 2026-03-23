import './global.css';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Text className="text-3xl font-bold text-emerald-400 tracking-widest">
        SYSTEM ONLINE
      </Text>
      <StatusBar style="light" />
    </View>
  );
}