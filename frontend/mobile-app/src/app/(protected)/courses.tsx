import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { CourseCard } from '@/features/courses/components/CourseCard';
import { useStudentCourses } from '@/features/courses/hooks/useStudentCourses';
import {
  AppScreen,
  AppText,
  EmptyState,
  ErrorState,
  LoadingState,
  ModuleHeader,
} from '@/shared/components';
import { colors, spacing } from '@/shared/theme';

export default function CoursesScreen(): React.JSX.Element {
  const { user } = useAuth();

  const { courses, isLoading, error, refetch } =
    useStudentCourses(user?.id);

  const totalCredits = useMemo(
    () =>
      courses.reduce(
        (total, item) =>
          total + Number(item.course.credits ?? 0),
        0,
      ),
    [courses],
  );

  const activeCourses = useMemo(
    () =>
      courses.filter((item) => {
        const status = item.status?.toLowerCase();

        return !status || status === 'active' || status === 'enrolled';
      }).length,
    [courses],
  );

  const academicPeriod =
    courses[0]?.academic_period ?? 'No registrado';

  return (
    <AppScreen>
      <ModuleHeader
        title="Cursos"
        subtitle="Consulta cursos matriculados, horarios, docentes y secciones."
      />

      {isLoading ? (
        <LoadingState message="Cargando tus cursos..." />
      ) : null}

      {!isLoading && error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : null}

      {!isLoading && !error && courses.length === 0 ? (
        <EmptyState
          title="Sin cursos"
          message="No tienes cursos matriculados para este periodo."
        />
      ) : null}

      {!isLoading && !error && courses.length > 0 ? (
        <>
          <View style={styles.contextBlock}>
            <AppText variant="sectionTitle">Mis cursos</AppText>

            <AppText color={colors.text.secondary} variant="caption">
              Periodo {academicPeriod} · {activeCourses} cursos ·{' '}
              {totalCredits} créditos
            </AppText>
          </View>

          {courses.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  contextBlock: {
    gap: spacing.xs,
  },
});