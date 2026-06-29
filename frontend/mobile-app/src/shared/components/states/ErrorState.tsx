import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/shared/components/forms/AppButton';
import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = 'Ocurrió un problema',
  message = 'No se pudo cargar la información.',
  onRetry,
}: ErrorStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText color={colors.status.error} variant="sectionTitle">
        {title}
      </AppText>

      <AppText color={colors.text.secondary} variant="caption">
        {message}
      </AppText>

      {onRetry ? <AppButton title="Reintentar" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.status.error,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
  },
});