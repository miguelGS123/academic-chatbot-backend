import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import type { ChatSession } from '@/features/questions/types/question.types';
import { AppText, Badge } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ConversationCardProps = {
  item: ChatSession;
  selected?: boolean;
  onPress: () => void;
};

function formatDate(value?: string | null): string {
  if (!value) return 'Sin fecha';

  return value.slice(0, 10);
}

export function ConversationCard({
  item,
  selected = false,
  onPress,
}: ConversationCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selected ? styles.containerSelected : null,
      ]}
    >
      <View style={styles.header}>
        <AppText color={colors.text.primary} variant="body">
          {item.title ?? 'Nueva conversación'}
        </AppText>

        {selected ? <Badge label="Abierta" variant="primary" /> : null}
      </View>

      <AppText color={colors.text.muted} variant="caption">
        {formatDate(item.created_at)}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  containerSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.background.elevated,
  },

  header: {
    gap: spacing.sm,
  },
});