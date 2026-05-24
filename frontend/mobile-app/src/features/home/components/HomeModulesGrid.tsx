import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { homeModules } from '@/features/home/constants/home-modules';

import {
  AppCard,
  AppText,
} from '@/shared/components';

import { colors, radius, spacing } from '@/shared/theme';

export function HomeModulesGrid(): React.JSX.Element {
  return (
    <AppCard>
      <AppText variant="sectionTitle">Módulos principales</AppText>

      <View style={styles.layout}>
        <View style={styles.row}>
          <ModuleActionCard
            description={homeModules[0].description}
            title={homeModules[0].title}
          />

          <ModuleActionCard
            description={homeModules[1].description}
            title={homeModules[1].title}
          />
        </View>

        <View style={styles.centerRow}>
          <ModuleActionCard
            description={homeModules[2].description}
            featured
            title={homeModules[2].title}
          />
        </View>

        <View style={styles.row}>
          <ModuleActionCard
            description={homeModules[3].description}
            title={homeModules[3].title}
          />

          <ModuleActionCard
            description={homeModules[4].description}
            title={homeModules[4].title}
          />
        </View>
      </View>
    </AppCard>
  );
}

type ModuleActionCardProps = {
  title: string;
  description: string;
  featured?: boolean;
};

function ModuleActionCard({
  title,
  description,
  featured = false,
}: ModuleActionCardProps): React.JSX.Element {
  return (
    <Pressable
      style={[
        styles.moduleCard,
        featured ? styles.moduleCardFeatured : null,
      ]}
    >
      <AppText color={colors.text.primary} variant="sectionTitle">
        {title}
      </AppText>

      <AppText color={colors.text.secondary} variant="caption">
        {description}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  layout: {
    gap: spacing.md,
  },

  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  centerRow: {
    alignItems: 'center',
  },

  moduleCard: {
    flex: 1,
    minHeight: 128,
    justifyContent: 'space-between',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
    gap: spacing.md,
  },

  moduleCardFeatured: {
    width: '62%',
    minHeight: 132,
    borderColor: colors.brand.primary,
    backgroundColor: colors.background.elevated,
  },
});