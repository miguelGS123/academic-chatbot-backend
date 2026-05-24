import { router, type Href } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  AppButton,
  AppCard,
  AppScreen,
  AppText,
  ModuleCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

const loginRoute = '/(auth)/login' as Href;

const modules = [
  {
    title: 'Estudio',
    description: 'Materiales y avance académico.',
  },
  {
    title: 'Cursos',
    description: 'Cursos inscritos y horarios.',
  },
  {
    title: 'Pagos',
    description: 'Estado financiero y cuotas.',
  },
  {
    title: 'Preguntas',
    description: 'Soporte académico rápido.',
  },
  {
    title: 'Docentes',
    description: 'Información de tus profesores.',
  },
] as const;

export default function HomeScreen(): React.JSX.Element {
  const { signOut } = useAuth();

  async function handleLogout(): Promise<void> {
    await signOut();
    router.replace(loginRoute);
  }

  return (
    <AppScreen>
      <View style={styles.header}>
        <View style={styles.badge}>
          <AppText variant="badge">Autónoma del Perú</AppText>
        </View>

        <AppText variant="title">Hola, Miguel</AppText>

        <AppText variant="subtitle">
          Bienvenido a tu espacio académico inteligente.
        </AppText>
      </View>

      <AppCard variant="highlight">
        <AppText variant="sectionTitle">Chatzitho</AppText>

        <AppText color={colors.text.primary}>
          Consulta tus cursos, pagos, docentes y dudas académicas desde un solo
          lugar.
        </AppText>
      </AppCard>

      <AppCard>
        <AppText variant="sectionTitle">Resumen académico</AppText>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <AppText variant="sectionTitle">5</AppText>
            <AppText variant="caption">Cursos activos</AppText>
          </View>

          <View style={styles.summaryItem}>
            <AppText variant="sectionTitle">2</AppText>
            <AppText variant="caption">Pagos pendientes</AppText>
          </View>
        </View>
      </AppCard>

      <AppCard>
        <AppText variant="sectionTitle">Módulos principales</AppText>

        <View style={styles.modulesGrid}>
          {modules.map((module) => (
            <ModuleCard
              key={module.title}
              title={module.title}
              description={module.description}
            />
          ))}
        </View>
      </AppCard>

      <AppButton title="Cerrar sesión" onPress={handleLogout} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.md,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background.elevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },

  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  summaryItem: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing.xs,
  },

  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});