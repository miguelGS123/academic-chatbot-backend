import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type EmptyStateProps = {
  title?: string;
  message?: string;
};

export function EmptyState({
  title = 'Sin información',
  message = 'No hay datos disponibles para mostrar.',
}: EmptyStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText color={colors.text.primary} variant="sectionTitle">
        {title}
      </AppText>

      <AppText color={colors.text.secondary} variant="caption">
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
  },
});