import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useStudentCourses } from '@/features/courses/hooks/useStudentCourses';
import {
  AppText,
  Badge,
  EmptyState,
  ErrorState,
  InfoItem,
  LoadingState,
  ModuleHeader,
  SectionCard,
} from '@/shared/components';
import { colors, spacing } from '@/shared/theme';

function formatTime(value: string): string {
  return value.slice(0, 5);
}

export default function CourseDetailScreen(): React.JSX.Element {
  const { courseCode } = useLocalSearchParams<{ courseCode: string }>();
  const { user } = useAuth();

  const { courses, isLoading, error, refetch } = useStudentCourses(user?.id);

  const courseItem = useMemo(
    () => courses.find((item) => item.course.course_code === courseCode),
    [courseCode, courses],
  );

  if (isLoading) {
    return (
      <AppScreenWrapper>
        <LoadingState message="Cargando detalle del curso..." />
      </AppScreenWrapper>
    );
  }

  if (error) {
    return (
      <AppScreenWrapper>
        <ErrorState message={error} onRetry={refetch} />
      </AppScreenWrapper>
    );
  }

  if (!courseItem) {
    return (
      <AppScreenWrapper>
        <EmptyState
          title="Curso no encontrado"
          message="No se encontró información del curso seleccionado."
        />
      </AppScreenWrapper>
    );
  }

  const { course, section, schedules } = courseItem;

  return (
    <AppScreenWrapper>
      <ModuleHeader
        title={course.course_name}
        subtitle={`${course.course_code} · Ciclo ${course.cycle}`}
      />

      <SectionCard title="Información general">
        <View style={styles.badges}>
          <Badge label={section?.modality ?? 'Sin modalidad'} variant="primary" />
          <Badge label={`Sección ${section?.section_code ?? '-'}`} />
          <Badge label={courseItem.status ?? 'Activo'} variant="success" />
        </View>

        <View style={styles.infoGrid}>
          <InfoItem label="Créditos" value={String(course.credits ?? 'N/R')} />
          <InfoItem label="Periodo" value={courseItem.academic_period ?? 'N/R'} />
          <InfoItem label="Campus" value={section?.campus ?? 'No registrado'} />
          <InfoItem
            label="Asistencia"
            value={courseItem.attendance_percentage ?? 'Pendiente'}
          />
        </View>
      </SectionCard>

      <SectionCard title="Docente">
        <AppText color={colors.text.primary} variant="body">
          {section?.teacher_name ?? 'No registrado'}
        </AppText>

        <AppText color={colors.text.secondary} variant="caption">
          La información de contacto se mostrará desde el módulo Docentes.
        </AppText>
      </SectionCard>

      <SectionCard title="Horarios">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <View key={schedule.id} style={styles.scheduleItem}>
              <View style={styles.scheduleDot} />

              <View style={styles.scheduleText}>
                <AppText color={colors.text.primary} variant="body">
                  {schedule.day_of_week}: {formatTime(schedule.start_time)} -{' '}
                  {formatTime(schedule.end_time)}
                </AppText>

                <AppText color={colors.text.secondary} variant="caption">
                  {schedule.classroom ?? 'Aula no registrada'} ·{' '}
                  {schedule.modality ?? section?.modality ?? 'Sin modalidad'}
                </AppText>
              </View>
            </View>
          ))
        ) : (
          <AppText color={colors.text.muted} variant="caption">
            Sin horarios registrados.
          </AppText>
        )}
      </SectionCard>

      <SectionCard title="Chat IA del curso">
        <AppText color={colors.text.secondary} variant="caption">
          Aquí integraremos el mini chatbot especializado para resolver preguntas
          sobre este curso: horarios, docente, sílabo, evaluaciones y recomendaciones.
        </AppText>
      </SectionCard>
    </AppScreenWrapper>
  );
}

function AppScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { AppScreen } = require('@/shared/components');

  return <AppScreen>{children}</AppScreen>;
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
  },

  scheduleDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.brand.accent,
    marginTop: 8,
  },

  scheduleText: {
    flex: 1,
    gap: spacing.xs,
  },
});