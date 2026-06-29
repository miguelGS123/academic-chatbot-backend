import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/typography/AppText';
import { colors, radius, spacing } from '@/shared/theme';

type MetricCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export function MetricCard({
  label,
  value,
  helper,
}: MetricCardProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText color={colors.text.muted} variant="caption">
        {label}
      </AppText>

      <AppText color={colors.text.primary} variant="sectionTitle">
        {value}
      </AppText>

      {helper ? (
        <AppText color={colors.text.secondary} variant="caption">
          {helper}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',
    gap: spacing.xs,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
  },
});