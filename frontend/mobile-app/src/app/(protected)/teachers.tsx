import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { TeacherCard } from '@/features/teachers/components/TeacherCard';
import { useMyTeachers } from '@/features/teachers/hooks/useMyTeachers';
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

export default function TeachersScreen(): React.JSX.Element {
  const { user } = useAuth();

  const { teachers, isLoading, error, refetch } = useMyTeachers(user?.id);

  const uniqueTeachers = new Set(
    teachers.map((teacher) => teacher.teacher_id),
  ).size;

  const uniqueCourses = new Set(
    teachers.map((teacher) => teacher.course_id),
  ).size;

  const academicPeriod = teachers[0]?.academic_period ?? '202601';

  return (
    <AppScreen>
      <ModuleHeader
        title="Docentes"
        subtitle="Consulta tus docentes, correos institucionales y cursos asignados."
      />

      {isLoading ? <LoadingState message="Cargando tus docentes..." /> : null}

      {!isLoading && error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : null}

      {!isLoading && !error && teachers.length === 0 ? (
        <EmptyState
          title="Sin docentes"
          message="No hay docentes asociados a tus cursos para este periodo."
        />
      ) : null}

      {!isLoading && !error && teachers.length > 0 ? (
        <>
          <SectionCard title="Resumen docente">
            <View style={styles.metricsGrid}>
              <MetricCard
                label="Docentes"
                value={String(uniqueTeachers)}
                helper="Asignados a tus cursos"
              />

              <MetricCard
                label="Cursos"
                value={String(uniqueCourses)}
                helper="Con docente registrado"
              />

              <MetricCard
                label="Periodo"
                value={academicPeriod}
                helper="Periodo académico"
              />

              <MetricCard
                label="Ciclo"
                value={String(user?.cycle ?? '-')}
                helper={user?.career ?? 'Carrera no registrada'}
              />
            </View>
          </SectionCard>

          <View style={styles.sectionHeader}>
            <AppText variant="sectionTitle">Mis docentes</AppText>

            <AppText color={colors.text.secondary} variant="caption">
              Revisa quién dicta cada curso y comunícate mediante el correo institucional.
            </AppText>
          </View>

          {teachers.map((teacher) => (
            <TeacherCard
              key={`${teacher.teacher_id}-${teacher.course_id}`}
              item={teacher}
            />
          ))}
        </>
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

  sectionHeader: {
    gap: spacing.xs,
    marginTop: spacing.md,
  },
});