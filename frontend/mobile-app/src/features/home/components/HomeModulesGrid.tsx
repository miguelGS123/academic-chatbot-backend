import { router, type Href } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { homeModules } from '@/features/home/constants/home-modules';
import { AppCard, AppText } from '@/shared/components'; // AppCard para estructurar el espacio
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
    <AppCard style={styles.transparentCard}>
      <AppText variant="sectionTitle" style={styles.sectionTitle}>Módulos principales</AppText>

      <View style={styles.layout}>
        <View style={styles.row}>
          <ModuleActionCard
            description={homeModules[0].description}
            title={homeModules[0].title}
            onPress={() => router.push(routes.study)}
            neonColor="cyan"
          />

          <ModuleActionCard
            description={homeModules[1].description}
            title={homeModules[1].title}
            onPress={() => router.push(routes.courses)}
            neonColor="cyan"
          />
        </View>

        <View style={styles.centerRow}>
          <ModuleActionCard
            description={homeModules[2].description}
            featured
            title={homeModules[2].title}
            onPress={() => router.push(routes.questions)}
            neonColor="pink"
          />
        </View>

        <View style={styles.row}>
          <ModuleActionCard
            description={homeModules[3].description}
            title={homeModules[3].title}
            onPress={() => router.push(routes.payments)}
            neonColor="purple"
          />

          <ModuleActionCard
            description={homeModules[4].description}
            title={homeModules[4].title}
            onPress={() => router.push(routes.teachers)}
            neonColor="purple"
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
  neonColor?: 'cyan' | 'pink' | 'purple';
};

function ModuleActionCard({
  title,
  description,
  featured = false,
  onPress,
  neonColor = 'cyan',
}: ModuleActionCardProps): React.JSX.Element {
  const neonCardStyle = styles[`neonCard_${neonColor}` as keyof typeof styles];
  const neonTextStyle = styles[`neonText_${neonColor}` as keyof typeof styles];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.moduleCard,
        featured ? styles.moduleCardFeatured : null,
        neonCardStyle,
        pressed ? styles.moduleCardPressed : null,
      ]}
    >
      <AppText style={[styles.cardTitle, neonTextStyle]} variant="sectionTitle">
        {title}
      </AppText>

      <AppText style={styles.cardSubtitle} variant="caption">
        {description}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  transparentCard: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    elevation: 0,
    shadowOpacity: 0,
    gap: spacing.md,
  },
  sectionTitle: {
    color: '#ffffff',
    marginBottom: spacing.xs,
  },
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
  /*  BASE GLASSMORPHISM CRISTALINO */
moduleCard: {
    width: '49%', // extremos
    height: 130,   // altura fija para que no se muevan
    justifyContent: 'space-between',
    borderRadius: radius.xl,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.02)', 
    padding: spacing.md,
  },
  moduleCardFeatured: {
    width: '62%', //
    minHeight: 132,
  },
  moduleCardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  /* ✍️ TEXTOS */
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#94a3b8',
  },
  /*  ADAPTACIONES NEÓN POR COLOR */
  neonCard_cyan: {
    borderColor: '#00f0ff',
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.25)',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  neonText_cyan: {
    color: '#00f0ff',
    textShadowColor: 'rgba(0, 240, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  neonCard_pink: {
    borderColor: '#ff007f',
    boxShadow: '0 0 20px rgba(255, 0, 127, 0.35)',
    shadowColor: '#ff007f',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  neonText_pink: {
    color: '#ff007f',
    textShadowColor: 'rgba(255, 0, 127, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  neonCard_purple: {
    borderColor: '#9d4edd',
    boxShadow: '0 0 15px rgba(157, 78, 221, 0.25)',
    shadowColor: '#9d4edd',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  neonText_purple: {
    color: '#9d4edd',
    textShadowColor: 'rgba(157, 78, 221, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});