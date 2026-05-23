import { Stack } from 'expo-router';
import React from 'react';

import { colors } from '@/shared/theme';

export default function AuthLayout(): React.JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
      }}
    />
  );
}