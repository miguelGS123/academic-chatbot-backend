import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({
  label,
  selected = false,
  onPress,
}: ChipProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selected ? styles.selected : null,
      ]}
    >
      <AppText
        color={selected ? colors.text.inverse : colors.text.secondary}
        variant="caption"
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.background.elevated,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  selected: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.brand.primary,
  },
});