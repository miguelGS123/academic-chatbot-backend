import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import type { TeacherCourse } from '@/features/teachers/types/teacher.types';
import {
  AppText,
  Badge,
  Divider,
  InfoItem,
  SectionCard,
} from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type TeacherCardProps = {
  item: TeacherCourse;
};

export function TeacherCard({ item }: TeacherCardProps): React.JSX.Element {
  async function handleEmailPress(): Promise<void> {
    await Linking.openURL(`mailto:${item.teacher_email}`);
  }

  return (
    <SectionCard>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <AppText color={colors.text.primary} variant="sectionTitle">
            {item.teacher_name}
          </AppText>

          <AppText color={colors.brand.primary} variant="caption">
            {item.teacher_email}
          </AppText>
        </View>

        <View style={styles.badges}>
          <Badge label={item.role ?? 'Docente'} variant="primary" />

          <Badge label={`Periodo ${item.academic_period}`} />
        </View>
      </View>

      <Divider />

      <View style={styles.infoGrid}>
        <InfoItem label="Curso" value={item.course_name} />

        <InfoItem label="Código" value={item.course_code} />

        <InfoItem label="Sección" value={item.section_code ?? 'N/R'} />

        <InfoItem label="Rol" value={item.role ?? 'Titular'} />
      </View>

      <Pressable onPress={() => void handleEmailPress()} style={styles.emailButton}>
        <AppText color={colors.text.inverse} variant="caption">
          Enviar correo institucional
        </AppText>
      </Pressable>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
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

  emailButton: {
    alignItems: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    padding: spacing.md,
  },
});