import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, spacing } from '@/shared/theme';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({
  message = 'Cargando información...',
}: LoadingStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.brand.primary} size="large" />
      <AppText color={colors.text.secondary} variant="caption">
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
});