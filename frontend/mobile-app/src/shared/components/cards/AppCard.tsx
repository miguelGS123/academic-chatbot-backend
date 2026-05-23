import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';

type AppCardProps = {
  children: React.ReactNode;
  variant?: 'default' | 'highlight';
  style?: ViewStyle;
};

export function AppCard({
  children,
  variant = 'default',
  style,
}: AppCardProps): React.JSX.Element {
  return (
    <View style={[styles.base, styles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },

  default: {
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },

  highlight: {
    backgroundColor: colors.brand.secondary,
  },
});
