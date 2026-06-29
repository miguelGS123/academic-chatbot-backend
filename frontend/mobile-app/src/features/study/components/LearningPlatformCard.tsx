import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import type { LearningPlatform } from '@/features/study/types/study.types';
import { AppText, Badge, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type LearningPlatformCardProps = {
  item: LearningPlatform;
};

export function LearningPlatformCard({
  item,
}: LearningPlatformCardProps): React.JSX.Element {
  async function handleOpen(): Promise<void> {
    await Linking.openURL(item.base_url);
  }

  return (
    <SectionCard>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <AppText variant="sectionTitle">{item.name}</AppText>

          <AppText color={colors.brand.primary} variant="caption">
            {item.provider}
          </AppText>
        </View>

        <View style={styles.badges}>
          {item.is_free ? <Badge label="Gratis" variant="success" /> : null}

          {item.has_certificate ? (
            <Badge label="Certificado" variant="primary" />
          ) : null}
        </View>
      </View>

      <AppText color={colors.text.secondary} variant="caption">
        {item.description}
      </AppText>

      <View style={styles.areas}>
        {item.areas.slice(0, 4).map((area) => (
          <Badge key={area} label={area} />
        ))}
      </View>

      <AppText color={colors.text.muted} variant="caption">
        Buscar: {item.search_hint}
      </AppText>

      <Pressable onPress={() => void handleOpen()} style={styles.linkButton}>
        <AppText color={colors.text.inverse} variant="caption">
          Abrir plataforma
        </AppText>
      </Pressable>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },

  titleBlock: {
    gap: spacing.xs,
  },

  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  areas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  linkButton: {
    alignItems: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    padding: spacing.md,
  },
});