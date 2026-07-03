import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type FloatingAIButtonProps = {
  label?: string;
  onPress: () => void;
};

export function FloatingAIButton({
  label = 'IA',
  onPress,
}: FloatingAIButtonProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AppText color={colors.text.inverse} variant="body">
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xl,
    minWidth: 56,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.md,
  },
});