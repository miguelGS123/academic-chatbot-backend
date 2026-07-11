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
  ModuleHeader,
  SectionCard,
} from '@/shared/components';

import { colors, radius, spacing } from '@/shared/theme';

export default function StudyScreen(): React.JSX.Element {
  const { user } = useAuth();

  const {
    platforms,
    nextCycle,
    isLoading,
    error,
    refetch,
  } = useStudyDashboard(user?.id);

  if (isLoading) {
    return (
      <AppScreen>
        <ModuleHeader
          title="Estudio"
          subtitle="Consulta tu avance, próximo ciclo y certificaciones."
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
          subtitle="Consulta tu avance, próximo ciclo y certificaciones."
        />

        <ErrorState
          message={error}
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ModuleHeader
        title="Estudio"
        subtitle="Consulta tu avance, próximo ciclo y certificaciones."
      />

      <SectionCard title="Estado académico">
        <View style={styles.statusBlock}>
          <View style={styles.statusRow}>
            <AppText
              color={colors.text.secondary}
              variant="caption"
            >
              Ciclo actual
            </AppText>

            <AppText variant="body">
              {user?.cycle ?? 'No registrado'}
            </AppText>
          </View>

          <View style={styles.statusRow}>
            <AppText
              color={colors.text.secondary}
              variant="caption"
            >
              Carrera
            </AppText>

            <AppText variant="body">
              {user?.career ?? 'No registrada'}
            </AppText>
          </View>

          <View style={styles.statusRow}>
            <AppText
              color={colors.text.secondary}
              variant="caption"
            >
              Estado
            </AppText>

            <AppText variant="body">
              {user?.cycle && user.cycle >= 10
                ? 'Último ciclo'
                : 'En curso'}
            </AppText>
          </View>
        </View>
      </SectionCard>

      <SectionCard title="Próximo ciclo">
        {nextCycle?.detail ? (
          <AppText
            color={colors.text.secondary}
            variant="caption"
          >
            {nextCycle.detail}
          </AppText>
        ) : null}

        {nextCycle?.message && !nextCycle.detail ? (
          <AppText
            color={colors.text.secondary}
            variant="caption"
          >
            {nextCycle.message}
          </AppText>
        ) : null}

        {nextCycle?.courses && nextCycle.courses.length > 0 ? (
          <View style={styles.list}>
            {nextCycle.courses.map((course) => (
              <View
                key={course.course_code}
                style={styles.coursePreview}
              >
                <AppText variant="body">
                  {course.course_name}
                </AppText>

                <AppText
                  color={colors.text.secondary}
                  variant="caption"
                >
                  {course.course_code} · Ciclo {course.cycle} ·{' '}
                  {course.credits ?? 'N/R'} créditos
                </AppText>
              </View>
            ))}
          </View>
        ) : (
          <AppText
            color={colors.text.muted}
            variant="caption"
          >
            No hay cursos de próximo ciclo disponibles.
          </AppText>
        )}
      </SectionCard>

      <View style={styles.sectionHeader}>
        <AppText variant="sectionTitle">
          Certificaciones recomendadas
        </AppText>

        <AppText
          color={colors.text.secondary}
          variant="caption"
        >
          Plataformas alineadas con tu carrera y etapa académica.
        </AppText>
      </View>

      {platforms.length > 0 ? (
        platforms.map((platform) => (
          <LearningPlatformCard
            key={platform.id}
            item={platform}
          />
        ))
      ) : (
        <EmptyState
          title="Sin plataformas"
          message="No hay plataformas de aprendizaje registradas."
        />
      )}

      {user?.id ? (
        <StudyMiniChat userId={user.id} />
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  statusBlock: {
    gap: spacing.md,
  },

  statusRow: {
    gap: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
    paddingBottom: spacing.sm,
  },

  list: {
    gap: spacing.sm,
  },

  coursePreview: {
    gap: spacing.xs,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  sectionHeader: {
    gap: spacing.xs,
  },
});