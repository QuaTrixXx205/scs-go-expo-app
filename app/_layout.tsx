// app/_layout.tsx
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Force dark nav bar style (light buttons/icons)
      try {
        NavigationBar.setButtonStyleAsync('light');
      } catch { }
    }
  }, []);

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: 'transparent', // để gradient phủ phía sau
    },
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#031a24ff', '#15343eff', '#202020ff']} // xanh đậm -> xanh xám
        style={{ flex: 1 }}
      >
        <ThemeProvider value={CustomDarkTheme}>
          <Stack
            screenOptions={{
              animation: 'slide_from_left', 
              gestureEnabled: true,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)/chargeHistory" options={{ title: "Lịch sử sạc" }} />
            <Stack.Screen name="(screens)/rentBattery" options={{ title: "Thuê pin" }} />
            <Stack.Screen name="(screens)/chargeStationLocation" options={{ title: "Địa điểm" }} />
            <Stack.Screen name="(screens)/codeScaner" options={{ title: "Quét QR" }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          {/* Light icons on dark gradient background */}
          <StatusBar style="light" animated />
        </ThemeProvider>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
