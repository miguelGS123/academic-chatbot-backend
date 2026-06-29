import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import type { StudentCourse } from '@/features/courses/types/course.types';
import { askQuestion } from '@/features/questions/services/questions.service';
import { AppText, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type CourseMiniChatProps = {
  userId: number;
  courseItem: StudentCourse;
};

export function CourseMiniChat({
  userId,
  courseItem,
}: CourseMiniChatProps): React.JSX.Element {
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const canSend = message.trim().length > 0 && !isSending;

  async function handleSend(): Promise<void> {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: cleanMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage('');
    setIsSending(true);

    try {
      const response = await askQuestion({
        user_id: userId,
        question: buildContextualQuestion(cleanMessage, courseItem),
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
    <SectionCard title="Chat IA del curso">
      <AppText color={colors.text.secondary} variant="caption">
        Haz preguntas puntuales sobre este curso. Chatzitho responderá de forma
        breve usando el contexto disponible.
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
              Ejemplos: ¿quién es mi docente?, ¿qué día tengo clase?, ¿cómo me
              organizo para estudiar?
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

function buildContextualQuestion(
  question: string,
  item: StudentCourse,
): string {
  const { course, section, schedules } = item;

  const schedulesText =
    schedules.length > 0
      ? schedules
          .map(
            (schedule) =>
              `${schedule.day_of_week}: ${schedule.start_time} - ${schedule.end_time}, ${schedule.classroom ?? 'aula no registrada'}`,
          )
          .join(' | ')
      : 'Sin horarios registrados';

  return `
Estás respondiendo dentro del mini chat del curso.

Curso:
${course.course_name} (${course.course_code})

Datos disponibles:
- Ciclo: ${course.cycle}
- Créditos: ${course.credits ?? 'No registrado'}
- Sección: ${section?.section_code ?? 'No registrada'}
- Docente: ${section?.teacher_name ?? 'No registrado'}
- Modalidad: ${section?.modality ?? 'No registrada'}
- Campus: ${section?.campus ?? 'No registrado'}
- Periodo: ${item.academic_period ?? 'No registrado'}
- Horarios: ${schedulesText}

Pregunta real del estudiante:
${question}

Instrucciones estrictas:
- Responde directo y breve.
- No repitas toda la información del curso.
- No uses markdown, asteriscos ni listas largas innecesarias.
- Si pregunta por docente, responde solo el nombre del docente.
- Si pregunta por horario, responde solo el horario.
- Si pregunta qué estudiar y no hay sílabo/materiales registrados, dilo claramente y recomienda una estrategia general basada en el tipo de curso.
- No inventes temas, notas, evaluaciones ni sílabos.
`.trim();
}

const styles = StyleSheet.create({
  messagesScroll: {
    maxHeight: 360,
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