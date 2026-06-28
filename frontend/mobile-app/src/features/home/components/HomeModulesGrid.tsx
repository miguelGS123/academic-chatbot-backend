import { router, type Href } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { homeModules } from '@/features/home/constants/home-modules';

import { AppCard, AppText } from '@/shared/components';

import { colors, radius, spacing } from '@/shared/theme';

const routes = {
  study: '/study' as Href,
  courses: '/courses' as Href,
  questions: '/questions' as Href,
  payments: '/payments' as Href,
  teachers: '/teachers' as Href,
};

export function HomeModulesGrid(): React.JSX.Element {
  return (
    <AppCard>
      <AppText variant="sectionTitle">Módulos principales</AppText>

      <View style={styles.layout}>
        <View style={styles.row}>
          <ModuleActionCard
            description={homeModules[0].description}
            title={homeModules[0].title}
            onPress={() => router.push(routes.study)}
          />

          <ModuleActionCard
            description={homeModules[1].description}
            title={homeModules[1].title}
            onPress={() => router.push(routes.courses)}
          />
        </View>

        <View style={styles.centerRow}>
          <ModuleActionCard
            description={homeModules[2].description}
            featured
            title={homeModules[2].title}
            onPress={() => router.push(routes.questions)}
          />
        </View>

        <View style={styles.row}>
          <ModuleActionCard
            description={homeModules[3].description}
            title={homeModules[3].title}
            onPress={() => router.push(routes.payments)}
          />

          <ModuleActionCard
            description={homeModules[4].description}
            title={homeModules[4].title}
            onPress={() => router.push(routes.teachers)}
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
  onPress: () => void;
};

function ModuleActionCard({
  title,
  description,
  featured = false,
  onPress,
}: ModuleActionCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.moduleCard,
        featured ? styles.moduleCardFeatured : null,
        pressed ? styles.moduleCardPressed : null,
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

  moduleCardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});