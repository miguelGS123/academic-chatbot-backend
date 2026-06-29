import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

export function Badge({
  label,
  variant = 'secondary',
}: BadgeProps): React.JSX.Element {
  return (
    <View style={[styles.container, styles[variant]]}>
      <AppText
        color={variant === 'primary' ? colors.text.inverse : colors.text.primary}
        variant="caption"
      >
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },

  primary: {
    backgroundColor: colors.brand.primary,
  },

  secondary: {
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.elevated,
  },

  success: {
    backgroundColor: colors.status.success,
  },

  warning: {
    backgroundColor: colors.status.warning,
  },

  error: {
    backgroundColor: colors.status.error,
  },
});