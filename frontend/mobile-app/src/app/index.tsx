import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppCard,
  AppScreen,
  AppText,
  ModuleCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

const modules = [
  {
    title: 'Estudio',
    description: 'Materiales, progreso y asistencia IA.',
  },
  {
    title: 'Cursos',
    description: 'Gestión académica y avance curricular.',
  },
  {
    title: 'Pagos',
    description: 'Estado financiero y pagos pendientes.',
  },
  {
    title: 'Preguntas',
    description: 'Consultas frecuentes y soporte académico.',
  },
  {
    title: 'Docentes',
    description: 'Información docente y acompañamiento.',
  },
] as const;

export default function HomeScreen(): React.JSX.Element {
  return (
    <AppScreen>
      <View style={styles.header}>
        <View style={styles.badge}>
          <AppText variant="badge">Academic Chatbot Platform</AppText>
        </View>

        <AppText variant="title">
          Plataforma universitaria inteligente
        </AppText>

        <AppText variant="subtitle">
          Frontend móvil profesional preparado para módulos, navegación,
          autenticación y agentes de IA.
        </AppText>
      </View>

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

      <AppCard variant="highlight">
        <AppText variant="sectionTitle">Agente IA transversal</AppText>

        <AppText color={colors.text.primary}>
          Preparado para integrarse luego con asistencia académica, consultas,
          pagos, cursos y soporte docente.
        </AppText>
      </AppCard>
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

  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});