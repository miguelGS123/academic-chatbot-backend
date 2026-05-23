import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, typography } from '@/shared/theme';

type AppTextVariant =
  | 'title'
  | 'subtitle'
  | 'sectionTitle'
  | 'body'
  | 'caption'
  | 'badge';

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  color?: string;
  children: React.ReactNode;
};

export function AppText({
  variant = 'body',
  color,
  style,
  children,
  ...props
}: AppTextProps): React.JSX.Element {
  return (
    <Text
      {...props}
      style={[styles.base, styles[variant], color ? { color } : null, style]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text.primary,
  },

  title: {
    fontSize: typography.size['3xl'],
    fontWeight: typography.weight.bold,
    lineHeight: 40,
  },

  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 24,
  },

  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },

  body: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 24,
  },

  caption: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },

  badge: {
    color: colors.brand.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
});
