import { Stack } from 'expo-router';
import { LocaleProvider } from '../context/LocaleContext';

export default function RootLayout() {
  return (
    <LocaleProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="lesson" options={{ headerShown: false }} />
        <Stack.Screen name="completion" options={{ headerShown: false }} />
      </Stack>
    </LocaleProvider>
  );
}