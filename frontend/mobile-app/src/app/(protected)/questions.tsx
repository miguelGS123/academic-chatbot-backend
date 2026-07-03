import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { GlobalChat } from '@/features/questions/components/GlobalChat';
import { SuggestedQuestionCard } from '@/features/questions/components/SuggestedQuestionCard';
import {
  AppScreen,
  AppText,
  EmptyState,
  ModuleHeader,
  SectionCard,
} from '@/shared/components';
import { colors, spacing } from '@/shared/theme';

const suggestedQuestions = [
  '¿Qué cursos llevo este ciclo?',
  '¿Qué curso me toca hoy?',
  '¿Cuánto debo pagar?',
  '¿Tengo pagos vencidos?',
  '¿Quiénes son mis docentes?',
  '¿Qué certificación me recomiendas?',
];

export default function QuestionsScreen(): React.JSX.Element {
  const { user } = useAuth();

  return (
    <AppScreen>
      <ModuleHeader
        title="Preguntas"
        subtitle="Chat global con IA para consultar información académica."
      />

      <SectionCard title="¿Qué puede hacer Chatzitho?">
        <AppText color={colors.text.secondary} variant="caption">
          Este asistente puede apoyarte consultando información de tus módulos:
          cursos, horarios, pagos, docentes, estudio y certificaciones.
        </AppText>

        <View style={styles.suggestionsGrid}>
          {suggestedQuestions.map((question) => (
            <SuggestedQuestionCard
              key={question}
              question={question}
              onPress={() => {
                // Por ahora solo mostramos sugerencias visuales.
                // Luego las conectamos para enviar automáticamente la pregunta.
              }}
            />
          ))}
        </View>
      </SectionCard>

      {user?.id ? (
        <GlobalChat userId={user.id} />
      ) : (
        <EmptyState
          title="Usuario no disponible"
          message="No se pudo identificar el usuario autenticado."
        />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  suggestionsGrid: {
    gap: spacing.sm,
  },
});