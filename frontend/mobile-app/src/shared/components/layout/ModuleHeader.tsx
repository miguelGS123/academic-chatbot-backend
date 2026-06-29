import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type ModuleHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ModuleHeader({
  title,
  subtitle,
}: ModuleHeaderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <AppText color={colors.text.primary} variant="body">
          ← Volver
        </AppText>
      </Pressable>

      <View style={styles.textContainer}>
        <AppText variant="title">{title}</AppText>

        {subtitle ? (
          <AppText color={colors.text.secondary} variant="subtitle">
            {subtitle}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },

  backButton: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.secondary,
  },

  textContainer: {
    gap: spacing.sm,
  },
});