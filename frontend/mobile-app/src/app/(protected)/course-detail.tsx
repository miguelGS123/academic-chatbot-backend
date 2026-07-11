import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { CourseMiniChat } from '@/features/courses/components/CourseMiniChat';
import { useStudentCourses } from '@/features/courses/hooks/useStudentCourses';
import {
  AppScreen,
  AppText,
  Badge,
  EmptyState,
  ErrorState,
  InfoItem,
  LoadingState,
  ModuleHeader,
  SectionCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

function formatTime(value: string): string {
  return value.slice(0, 5);
}

export default function CourseDetailScreen(): React.JSX.Element {
  const params =
    useLocalSearchParams<{ courseCode?: string }>();

  const { user } = useAuth();

  const courseCode =
    typeof params.courseCode === 'string'
      ? params.courseCode
      : null;

  const {
    courses,
    isLoading,
    error,
    refetch,
  } = useStudentCourses(user?.id);

  const courseItem = useMemo(
    () =>
      courses.find(
        (item) =>
          item.course.course_code === courseCode,
      ),
    [courseCode, courses],
  );

  if (isLoading) {
    return (
      <AppScreen>
        <LoadingState message="Cargando detalle del curso..." />
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <ErrorState
          message={error}
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  if (!courseCode || !courseItem) {
    return (
      <AppScreen>
        <EmptyState
          title="Curso no encontrado"
          message="No se encontró información del curso seleccionado."
        />
      </AppScreen>
    );
  }

  const {
    course,
    section,
    schedules,
  } = courseItem;

  return (
    <AppScreen>
      <ModuleHeader
        title={course.course_name}
        subtitle={`${course.course_code} · Ciclo ${course.cycle}`}
      />

      <SectionCard title="Información general">
        <View style={styles.badges}>
          <Badge
            label={
              section?.modality ??
              'Sin modalidad'
            }
            variant="primary"
          />

          <Badge
            label={`Sección ${
              section?.section_code ?? '-'
            }`}
          />

          <Badge
            label={courseItem.status ?? 'Activo'}
            variant="success"
          />
        </View>

        <View style={styles.infoGrid}>
          <InfoItem
            label="Créditos"
            value={String(
              course.credits ?? 'N/R',
            )}
          />

          <InfoItem
            label="Periodo"
            value={
              courseItem.academic_period ??
              'N/R'
            }
          />

          <InfoItem
            label="Campus"
            value={
              section?.campus ??
              'No registrado'
            }
          />

          <InfoItem
            label="Asistencia"
            value={
              courseItem.attendance_percentage ??
              'Pendiente'
            }
          />
        </View>
      </SectionCard>

      <SectionCard title="Docente">
        <AppText
          color={colors.text.primary}
          variant="body"
        >
          {section?.teacher_name ??
            'No registrado'}
        </AppText>

        <AppText
          color={colors.text.secondary}
          variant="caption"
        >
          Consulta el correo institucional desde
          Docentes o mediante el asistente.
        </AppText>
      </SectionCard>

      <SectionCard title="Horarios">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <View
              key={schedule.id}
              style={styles.scheduleItem}
            >
              <View style={styles.scheduleDot} />

              <View style={styles.scheduleText}>
                <AppText
                  color={colors.text.primary}
                  variant="body"
                >
                  {schedule.day_of_week}:{' '}
                  {formatTime(
                    schedule.start_time,
                  )}{' '}
                  -{' '}
                  {formatTime(
                    schedule.end_time,
                  )}
                </AppText>

                <AppText
                  color={colors.text.secondary}
                  variant="caption"
                >
                  {schedule.classroom ??
                    'Aula no registrada'}{' '}
                  ·{' '}
                  {schedule.modality ??
                    section?.modality ??
                    'Sin modalidad'}
                </AppText>
              </View>
            </View>
          ))
        ) : (
          <AppText
            color={colors.text.muted}
            variant="caption"
          >
            Sin horarios registrados.
          </AppText>
        )}
      </SectionCard>

      {user?.id ? (
        <CourseMiniChat
          userId={user.id}
          courseItem={courseItem}
        />
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  scheduleItem: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  scheduleDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.brand.accent,
    marginTop: 8,
  },

  scheduleText: {
    flex: 1,
    gap: spacing.xs,
  },
});