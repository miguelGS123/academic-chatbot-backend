import { Redirect, type Href } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { colors } from '@/shared/theme';

const loginRoute = '/(auth)/login' as Href;
const homeRoute = '/(protected)/home' as Href;

export default function IndexScreen(): React.JSX.Element {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.brand.primary} />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? homeRoute : loginRoute} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
});