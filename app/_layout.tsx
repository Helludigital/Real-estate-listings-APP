import 'react-native-gesture-handler';
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../styles/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.cardBackground },
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="listing/[id]" options={{ title: 'Property Details' }} />
      <Stack.Screen name="contact/[id]" options={{ title: 'Contact Agent' }} />
      <Stack.Screen name="filters" options={{ title: 'Filters' }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Quick Action' }} />
      <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
    </Stack>
  );
}
