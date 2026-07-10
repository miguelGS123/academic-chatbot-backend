import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { TeacherCard } from '@/features/teachers/components/TeacherCard';
import { TeacherMiniChat } from '@/features/teachers/components/TeacherMiniChat';
import { useMyTeachers } from '@/features/teachers/hooks/useMyTeachers';
import {
  AppScreen,
  AppText,
  EmptyState,
  ErrorState,
  LoadingState,
  ModuleHeader,
} from '@/shared/components';
import { colors, spacing } from '@/shared/theme';

export default function TeachersScreen(): React.JSX.Element {
  const { user } = useAuth();

  const { teachers, isLoading, error, refetch } = useMyTeachers(user?.id);

  const uniqueTeacherCount = useMemo(
    () => new Set(teachers.map((item) => item.teacher_id)).size,
    [teachers],
  );

  const academicPeriod = teachers[0]?.academic_period ?? 'No registrado';

  return (
    <AppScreen>
      <ModuleHeader
        title="Docentes"
        subtitle="Consulta docentes, cursos asignados y correos institucionales."
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
          <View style={styles.contextBlock}>
            <AppText variant="sectionTitle">Mis docentes</AppText>

            <AppText color={colors.text.secondary} variant="caption">
              {uniqueTeacherCount} docentes asignados · Periodo{' '}
              {academicPeriod}
            </AppText>
          </View>

          {teachers.map((teacher) => (
            <TeacherCard
              key={`${teacher.teacher_id}-${teacher.course_id}`}
              item={teacher}
            />
          ))}

          {user?.id ? (
            <TeacherMiniChat userId={user.id} teachers={teachers} />
          ) : null}
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