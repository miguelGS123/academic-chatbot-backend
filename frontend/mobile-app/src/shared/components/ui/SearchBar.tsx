import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
};

export function SearchBar({
  value,
  placeholder = 'Buscar...',
  onChangeText,
}: SearchBarProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
  },

  input: {
    minHeight: 48,
    color: colors.text.primary,
  },
});