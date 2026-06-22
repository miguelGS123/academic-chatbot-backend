import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing, typography } from '@/shared/theme';

type AppInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function AppInput({
  label,
  error,
  style,
  ...props
}: AppInputProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText variant="caption">{label}</AppText>

      <TextInput
        {...props}
        placeholderTextColor={colors.text.muted}
        style={[styles.input, error ? styles.inputError : null, style]}
      />

      {error ? (
        <AppText color={colors.status.error} variant="caption">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },

  input: {
    minHeight: 52,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.lg,
    color: colors.text.primary,
    fontSize: typography.size.md,
  },

  inputError: {
    borderColor: colors.status.error,
  },
});