import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import type {
  LearningPlatform,
  NextCycleResponse,
} from '@/features/study/types/study.types';
import { askQuestion } from '@/features/questions/services/questions.service';
import { AppText, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type StudyMiniChatProps = {
  userId: number;
  currentCycle?: number | null;
  career?: string | null;
  nextCycle: NextCycleResponse | null;
  platforms: LearningPlatform[];
};

export function StudyMiniChat({
  userId,
  currentCycle,
  career,
  nextCycle,
  platforms,
}: StudyMiniChatProps): React.JSX.Element {
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const canSend = message.trim().length > 0 && !isSending;

  async function handleSend(): Promise<void> {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-user`,
        role: 'user',
        text: cleanMessage,
      },
    ]);

    setMessage('');
    setIsSending(true);

    try {
      const response = await askQuestion({
        user_id: userId,
        question: buildStudyContextQuestion({
          question: cleanMessage,
          currentCycle,
          career,
          nextCycle,
          platforms,
        }),
        session_id: sessionId,
      });

      setSessionId(response.session_id);

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          text: response.answer,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          text: 'No pude responder en este momento. Verifica que el backend esté activo e inténtalo nuevamente.',
        },
      ]);
    } finally {
      setIsSending(false);

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }
  }

  return (
    <SectionCard title="Asistente de estudio">
      <AppText color={colors.text.secondary} variant="caption">
        Consulta sobre tu avance académico, próximo ciclo, prerrequisitos o
        certificaciones recomendadas.
      </AppText>

      <ScrollView
        ref={scrollRef}
        nestedScrollEnabled
        style={styles.messagesScroll}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyChat}>
            <AppText color={colors.text.muted} variant="caption">
              Ejemplos: ¿qué certificación me recomiendas?, ¿qué sigue después
              de mi ciclo?, ¿cómo puedo reforzar mi perfil académico?
            </AppText>
          </View>
        ) : (
          messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageBubble,
                item.role === 'user'
                  ? styles.userBubble
                  : styles.assistantBubble,
              ]}
            >
              <AppText
                color={
                  item.role === 'user'
                    ? colors.text.inverse
                    : colors.text.primary
                }
                variant="caption"
              >
                {item.text}
              </AppText>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder="Escribe tu pregunta..."
          placeholderTextColor={colors.text.muted}
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />

        <Pressable
          disabled={!canSend}
          onPress={() => {
            void handleSend();
          }}
          style={[
            styles.sendButton,
            !canSend ? styles.sendButtonDisabled : null,
          ]}
        >
          <AppText color={colors.text.inverse} variant="caption">
            {isSending ? 'Enviando...' : 'Enviar'}
          </AppText>
        </Pressable>
      </View>
    </SectionCard>
  );
}

function buildStudyContextQuestion({
  question,
  currentCycle,
  career,
  nextCycle,
  platforms,
}: {
  question: string;
  currentCycle?: number | null;
  career?: string | null;
  nextCycle: NextCycleResponse | null;
  platforms: LearningPlatform[];
}): string {
  const platformsText = platforms
    .map(
      (platform) =>
        `${platform.name} (${platform.provider}) - áreas: ${platform.areas.join(', ')}`,
    )
    .join(' | ');

  return `
Estás respondiendo dentro del módulo Estudio.

Datos disponibles:
- Carrera: ${career ?? 'No registrada'}
- Ciclo actual: ${currentCycle ?? 'No registrado'}
- Próximo ciclo: ${nextCycle?.next_cycle ?? 'No aplica'}
- Mensaje próximo ciclo: ${nextCycle?.detail ?? nextCycle?.message ?? 'No registrado'}
- Plataformas recomendadas: ${platformsText || 'No registradas'}

Pregunta del estudiante:
${question}

Instrucciones:
- Responde directo y breve.
- No repitas toda la información visible en pantalla.
- Si falta malla, sílabo, notas o prerequisitos detallados, indícalo claramente.
- Recomienda solo con la información disponible.
- No inventes cursos, notas, fechas ni requisitos.
`.trim();
}

const styles = StyleSheet.create({
  messagesScroll: {
    maxHeight: 320,
  },

  messagesContent: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },

  emptyChat: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },

  messageBubble: {
    maxWidth: '92%',
    borderRadius: radius.lg,
    padding: spacing.md,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.brand.primary,
  },

  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },

  inputContainer: {
    gap: spacing.sm,
  },

  input: {
    minHeight: 88,
    maxHeight: 140,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
    padding: spacing.md,
    textAlignVertical: 'top',
  },

  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    padding: spacing.md,
  },

  sendButtonDisabled: {
    opacity: 0.5,
  },
});