import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type InfoItemProps = {
  label: string;
  value: string;
};

export function InfoItem({
  label,
  value,
}: InfoItemProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText color={colors.text.muted} variant="caption">
        {label}
      </AppText>

      <AppText color={colors.text.primary} variant="caption">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',
    gap: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },
});