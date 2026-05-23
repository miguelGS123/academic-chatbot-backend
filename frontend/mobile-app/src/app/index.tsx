import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/shared/theme';

export default function HomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.badge}>Academic Chatbot Platform</Text>

          <Text style={styles.title}>
            Plataforma universitaria inteligente
          </Text>

          <Text style={styles.subtitle}>
            Frontend móvil profesional listo para construir módulos, navegación
            y experiencia IA.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Módulos principales</Text>

          <View style={styles.modulesGrid}>
            <View style={styles.moduleItem}>
              <Text style={styles.moduleTitle}>Estudio</Text>
            </View>

            <View style={styles.moduleItem}>
              <Text style={styles.moduleTitle}>Cursos</Text>
            </View>

            <View style={styles.moduleItem}>
              <Text style={styles.moduleTitle}>Pagos</Text>
            </View>

            <View style={styles.moduleItem}>
              <Text style={styles.moduleTitle}>Preguntas</Text>
            </View>

            <View style={styles.moduleItem}>
              <Text style={styles.moduleTitle}>Docentes</Text>
            </View>
          </View>
        </View>

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>Agente IA transversal</Text>
          <Text style={styles.aiText}>
            Preparado para integrarse luego con asistencia académica,
            consultas, pagos, cursos y soporte docente.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  content: {
    padding: spacing.xl,
    gap: spacing.xl,
  },

  header: {
    gap: spacing.md,
  },

  badge: {
    alignSelf: 'flex-start',
    color: colors.brand.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    backgroundColor: colors.background.elevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },

  title: {
    color: colors.text.primary,
    fontSize: typography.size['3xl'],
    fontWeight: typography.weight.bold,
    lineHeight: 40,
  },

  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 24,
  },

  card: {
    backgroundColor: colors.background.elevated,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing.lg,
  },

  cardTitle: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },

  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  moduleItem: {
    width: '47%',
    minHeight: 84,
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },

  moduleTitle: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },

  aiCard: {
    backgroundColor: colors.brand.secondary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },

  aiTitle: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },

  aiText: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
    lineHeight: 22,
  },
});