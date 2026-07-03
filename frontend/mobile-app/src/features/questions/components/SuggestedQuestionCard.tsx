import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type SuggestedQuestionCardProps = {
  question: string;
  onPress: () => void;
};

export function SuggestedQuestionCard({
  question,
  onPress,
}: SuggestedQuestionCardProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AppText color={colors.text.secondary} variant="caption">
        {question}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },
});