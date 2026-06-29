import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { AppCard } from '@/shared/components/cards/AppCard';
import { AppText } from '@/shared/components/typography/AppText';
import { colors, spacing } from '@/shared/theme';

type SectionCardProps = {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
};

export function SectionCard({
  title,
  children,
  style,
}: SectionCardProps): React.JSX.Element {
  return (
    <AppCard style={style}>
      <View style={styles.container}>
        {title ? (
          <AppText color={colors.text.primary} variant="body">
            {title}
          </AppText>
        ) : null}

        {children}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});