import React from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type ModuleCardProps = {
  title: string;
  description?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function ModuleCard({
  title,
  description,
  onPress,
  style,
}: ModuleCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
        style,
      ]}
    >
      <AppText variant="sectionTitle">{title}</AppText>

      {description ? (
        <AppText variant="caption">{description}</AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',
    minHeight: 104,
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing.sm,
  },

  pressed: {
    opacity: 0.75,
  },
});