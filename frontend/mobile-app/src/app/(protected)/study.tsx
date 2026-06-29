import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { LearningPlatformCard } from '@/features/study/components/LearningPlatformCard';
import { StudyMiniChat } from '@/features/study/components/StudyMiniChat';
import { useStudyDashboard } from '@/features/study/hooks/useStudyDashboard';

import {
  AppScreen,
  AppText,
  EmptyState,
  ErrorState,
  LoadingState,
  MetricCard,
  ModuleHeader,
  SectionCard,
} from '@/shared/components';

import { colors, spacing } from '@/shared/theme';

export default function StudyScreen(): React.JSX.Element {
  const { user } = useAuth();

  const { platforms, nextCycle, isLoading, error, refetch } =
    useStudyDashboard(user?.id);

  if (isLoading) {
    return (
      <AppScreen>
        <ModuleHeader
          title="Estudio"
          subtitle="Consulta tu avance académico, próximo ciclo y certificaciones."
        />

        <LoadingState message="Cargando información académica..." />
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <ModuleHeader
          title="Estudio"
          subtitle="Consulta tu avance académico, próximo ciclo y certificaciones."
        />

        <ErrorState message={error} onRetry={refetch} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ModuleHeader
        title="Estudio"
        subtitle="Consulta tu avance académico, próximo ciclo y certificaciones."
      />

      <SectionCard title="Resumen académico">
        <View style={styles.metricsGrid}>
          <MetricCard
            label="Ciclo actual"
            value={String(user?.cycle ?? '-')}
            helper={user?.career ?? 'Carrera no registrada'}
          />

          <MetricCard
            label="Estado"
            value={user?.cycle && user.cycle >= 10 ? 'Último ciclo' : 'En curso'}
            helper="Según ciclo registrado"
          />

          <MetricCard
            label="Próximo ciclo"
            value={
              nextCycle?.next_cycle
                ? String(nextCycle.next_cycle)
                : 'No aplica'
            }
            helper="Estimación académica"
          />

          <MetricCard
            label="Plataformas"
            value={String(platforms.length)}
            helper="Recomendadas"
          />
        </View>
      </SectionCard>

      <SectionCard title="Próximo ciclo">
        {nextCycle?.detail ? (
          <AppText color={colors.text.secondary} variant="caption">
            {nextCycle.detail}
          </AppText>
        ) : null}

        {nextCycle?.courses && nextCycle.courses.length > 0 ? (
          <View style={styles.list}>
            {nextCycle.courses.map((course) => (
              <View key={course.course_code} style={styles.coursePreview}>
                <AppText variant="body">{course.course_name}</AppText>

                <AppText color={colors.text.secondary} variant="caption">
                  {course.course_code} · Ciclo {course.cycle} ·{' '}
                  {course.credits ?? 'N/R'} créditos
                </AppText>
              </View>
            ))}
          </View>
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            No hay cursos de próximo ciclo disponibles para mostrar.
          </AppText>
        )}
      </SectionCard>

      <View style={styles.sectionHeader}>
        <AppText variant="sectionTitle">Certificaciones recomendadas</AppText>

        <AppText color={colors.text.secondary} variant="caption">
          Plataformas alineadas a Ingeniería de Sistemas, cloud, redes,
          seguridad, backend, datos y DevOps.
        </AppText>
      </View>

      {platforms.length > 0 ? (
        platforms.map((platform) => (
          <LearningPlatformCard key={platform.id} item={platform} />
        ))
      ) : (
        <EmptyState
          title="Sin plataformas"
          message="No hay plataformas de aprendizaje registradas."
        />
      )}

      {user?.id ? (
        <StudyMiniChat
          userId={user.id}
          currentCycle={user.cycle}
          career={user.career}
          nextCycle={nextCycle}
          platforms={platforms}
        />
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  list: {
    gap: spacing.sm,
  },

  coursePreview: {
    gap: spacing.xs,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  sectionHeader: {
    gap: spacing.xs,
    marginTop: spacing.md,
  },
});