import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import type { StudentCourse } from '@/features/courses/types/course.types';
import {
  AppText,
  Badge,
  Divider,
  InfoItem,
  SectionCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type CourseCardProps = {
  item: StudentCourse;
  onPress?: () => void;
};

function formatTime(value: string): string {
  return value.slice(0, 5);
}

function getStatusLabel(status?: string | null): string {
  if (!status) return 'Activo';

  const labels: Record<string, string> = {
    enrolled: 'Matriculado',
    active: 'Activo',
    completed: 'Finalizado',
    dropped: 'Retirado',
  };

  return labels[status] ?? status;
}

export function CourseCard({
  item,
  onPress,
}: CourseCardProps): React.JSX.Element {
  const { course, section, schedules } = item;

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [pressed ? styles.pressed : null]}
    >
      <SectionCard>
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <AppText color={colors.text.primary} variant="sectionTitle">
              {course.course_name}
            </AppText>

            <AppText color={colors.brand.primary} variant="caption">
              {course.course_code} · Ciclo {course.cycle}
            </AppText>
          </View>

          <View style={styles.badges}>
            <Badge label={section?.modality ?? 'Sin modalidad'} variant="primary" />
            <Badge label={`Sección ${section?.section_code ?? '-'}`} />
            <Badge label={getStatusLabel(item.status)} variant="success" />
          </View>
        </View>

        <Divider />

        <View style={styles.infoGrid}>
          <InfoItem label="Créditos" value={String(course.credits ?? 'N/R')} />
          <InfoItem label="Periodo" value={item.academic_period ?? 'N/R'} />
          <InfoItem label="Campus" value={section?.campus ?? 'No registrado'} />
          <InfoItem
            label="Asistencia"
            value={item.attendance_percentage ?? 'Pendiente'}
          />
        </View>

        <View style={styles.teacherBlock}>
          <AppText color={colors.text.secondary} variant="caption">
            Docente
          </AppText>

          <AppText color={colors.text.primary} variant="body">
            {section?.teacher_name ?? 'No registrado'}
          </AppText>
        </View>

        <View style={styles.scheduleBlock}>
          <AppText color={colors.text.primary} variant="body">
            Horarios
          </AppText>

          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <View key={schedule.id} style={styles.scheduleItem}>
                <View style={styles.scheduleDot} />

                <View style={styles.scheduleText}>
                  <AppText color={colors.text.primary} variant="caption">
                    {schedule.day_of_week}: {formatTime(schedule.start_time)} -{' '}
                    {formatTime(schedule.end_time)}
                  </AppText>

                  <AppText color={colors.text.muted} variant="caption">
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
        </View>

        <AppText color={colors.brand.primary} variant="caption">
          Toca para ver detalles del curso →
        </AppText>
      </SectionCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  header: {
    gap: spacing.md,
  },

  titleBlock: {
    gap: spacing.xs,
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

  teacherBlock: {
    gap: spacing.xs,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.md,
  },

  scheduleBlock: {
    gap: spacing.sm,
  },

  scheduleItem: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  scheduleDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.brand.accent,
    marginTop: 6,
  },

  scheduleText: {
    flex: 1,
    gap: spacing.xs,
  },
});