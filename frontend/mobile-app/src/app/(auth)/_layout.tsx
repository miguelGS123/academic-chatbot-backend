import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

import { AuthProvider } from '@/features/auth/context/AuthContext';
import { colors } from '@/shared/theme';

export default function RootLayout(): React.JSX.Element {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background.primary}
      />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background.primary,
          },
        }}
      />
    </AuthProvider>
  );
}