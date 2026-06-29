import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { CourseCard } from '@/features/courses/components/CourseCard';
import { CourseMiniChat } from '@/features/courses/components/CourseMiniChat';
import { useStudentCourses } from '@/features/courses/hooks/useStudentCourses';
import type { StudentCourse } from '@/features/courses/types/course.types';
import {
  AppButton,
  AppScreen,
  AppText,
  Badge,
  EmptyState,
  ErrorState,
  InfoItem,
  LoadingState,
  MetricCard,
  ModuleHeader,
  SectionCard,
} from '@/shared/components';
import { colors, spacing } from '@/shared/theme';

function formatTime(value: string): string {
  return value.slice(0, 5);
}

export default function CoursesScreen(): React.JSX.Element {
  const { user } = useAuth();

  const [selectedCourse, setSelectedCourse] =
    useState<StudentCourse | null>(null);

  const { courses, isLoading, error, refetch } =
    useStudentCourses(user?.id);

  const totalCredits = useMemo(
    () =>
      courses.reduce(
        (total, item) => total + Number(item.course.credits ?? 0),
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

  const academicPeriod = courses[0]?.academic_period ?? '2026-I';

  if (selectedCourse && user?.id) {
    return (
      <CourseDetailView
        item={selectedCourse}
        userId={user.id}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <AppScreen>
      <ModuleHeader
        title="Cursos"
        subtitle="Consulta tus cursos matriculados, horarios, docentes y secciones."
      />

      {isLoading ? <LoadingState message="Cargando tus cursos..." /> : null}

      {!isLoading && error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : null}

      {!isLoading && !error && courses.length === 0 ? (
        <EmptyState
          title="Sin cursos"
          message="No tienes cursos matriculados registrados para este periodo."
        />
      ) : null}

      {!isLoading && !error && courses.length > 0 ? (
        <>
          <SectionCard title="Resumen académico">
            <View style={styles.metricsGrid}>
              <MetricCard
                label="Periodo"
                value={academicPeriod}
                helper="Ciclo académico actual"
              />

              <MetricCard
                label="Cursos"
                value={String(activeCourses)}
                helper="Matriculados activos"
              />

              <MetricCard
                label="Créditos"
                value={String(totalCredits)}
                helper="Créditos inscritos"
              />

              <MetricCard
                label="Ciclo"
                value={String(user?.cycle ?? '-')}
                helper={user?.career ?? 'Carrera no registrada'}
              />
            </View>
          </SectionCard>

          <View style={styles.sectionHeader}>
            <AppText variant="sectionTitle">Mis cursos</AppText>

            <AppText color={colors.text.secondary} variant="caption">
              Selecciona un curso para revisar sus detalles.
            </AppText>
          </View>

          {courses.map((course) => (
            <CourseCard
              key={course.id}
              item={course}
              onPress={() => setSelectedCourse(course)}
            />
          ))}
        </>
      ) : null}
    </AppScreen>
  );
}

type CourseDetailViewProps = {
  item: StudentCourse;
  userId: number;
  onBack: () => void;
};

function CourseDetailView({
  item,
  userId,
  onBack,
}: CourseDetailViewProps): React.JSX.Element {
  const { course, section, schedules } = item;

  return (
    <AppScreen>
      <ModuleHeader
        title={course.course_name}
        subtitle={`${course.course_code} · Ciclo ${course.cycle}`}
      />

      <AppButton title="Volver a mis cursos" onPress={onBack} />

      <SectionCard title="Información general">
        <View style={styles.badges}>
          <Badge
            label={section?.modality ?? 'Sin modalidad'}
            variant="primary"
          />

          <Badge label={`Sección ${section?.section_code ?? '-'}`} />

          <Badge label={item.status ?? 'Activo'} variant="success" />
        </View>

        <View style={styles.infoGrid}>
          <InfoItem label="Créditos" value={String(course.credits ?? 'N/R')} />

          <InfoItem label="Periodo" value={item.academic_period ?? 'N/R'} />

          <InfoItem
            label="Campus"
            value={section?.campus ?? 'No registrado'}
          />

          <InfoItem
            label="Asistencia"
            value={item.attendance_percentage ?? 'Pendiente'}
          />
        </View>
      </SectionCard>

      <SectionCard title="Docente">
        <AppText color={colors.text.primary} variant="body">
          {section?.teacher_name ?? 'No registrado'}
        </AppText>

        <AppText color={colors.text.secondary} variant="caption">
          Luego conectaremos el correo institucional desde el módulo Docentes.
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

      <CourseMiniChat userId={userId} courseItem={item} />
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