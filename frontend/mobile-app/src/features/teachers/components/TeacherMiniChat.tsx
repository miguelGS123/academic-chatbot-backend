import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { askQuestion } from '@/features/questions/services/questions.service';
import type { TeacherCourse } from '@/features/teachers/types/teacher.types';
import { AppText, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type TeacherMiniChatProps = {
  userId: number;
  teachers: TeacherCourse[];
};

export function TeacherMiniChat({
  userId,
  teachers,
}: TeacherMiniChatProps): React.JSX.Element {
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const canSend = message.trim().length > 0 && !isSending;

  async function handleSend(): Promise<void> {
    const cleanMessage = message.trim();

    if (!cleanMessage || isSending) {
      return;
    }

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
        question: buildTeacherContextQuestion(cleanMessage, teachers),
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
          text:
            'No pude responder en este momento. Verifica la conexión con el backend.',
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
    <SectionCard title="Asistente de docentes">
      <AppText color={colors.text.secondary} variant="caption">
        Consulta docentes asignados, cursos, secciones y correos
        institucionales.
      </AppText>

      <ScrollView
        ref={scrollRef}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        style={styles.messagesScroll}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyChat}>
            <AppText color={colors.text.muted} variant="caption">
              Pregunta quién dicta un curso o cuál es el correo institucional
              de un docente.
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

        {isSending ? (
          <View style={[styles.messageBubble, styles.assistantBubble]}>
            <AppText color={colors.text.muted} variant="caption">
              Chatzitho está revisando tus docentes...
            </AppText>
          </View>
        ) : null}
      </ScrollView>

      <TextInput
        editable={!isSending}
        multiline
        placeholder="Escribe tu consulta..."
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
        <AppText color={colors.text.inverse} variant="body">
          {isSending ? 'Procesando...' : 'Enviar'}
        </AppText>
      </Pressable>
    </SectionCard>
  );
}

function buildTeacherContextQuestion(
  question: string,
  teachers: TeacherCourse[],
): string {
  return `
Estás respondiendo dentro del módulo Docentes.

Información docente disponible:
${JSON.stringify(teachers)}

Pregunta del estudiante:
${question}

Instrucciones:
- Responde únicamente sobre los docentes incluidos en la información disponible.
- Puedes indicar docente, curso, sección, periodo y correo institucional.
- No inventes teléfonos, oficinas, horarios de asesoría, experiencia o publicaciones.
- Responde de forma directa y breve.
`.trim();
}

const styles = StyleSheet.create({
  messagesScroll: {
    maxHeight: 300,
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
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
  },

  input: {
    minHeight: 64,
    maxHeight: 120,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.strong,
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
    opacity: 0.45,
  },
});