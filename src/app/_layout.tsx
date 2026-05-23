import '@/i18n';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { DashboardColors } from '@/constants/dashboard-theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: DashboardColors.bg },
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="mock-test" />
        <Stack.Screen name="practice/[category]" />
      </Stack>
    </ThemeProvider>
  );
}
