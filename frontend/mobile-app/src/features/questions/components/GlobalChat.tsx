import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { askQuestion } from '@/features/questions/services/questions.service';
import { AppText, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type GlobalChatProps = {
  userId: number;
};

export function GlobalChat({ userId }: GlobalChatProps): React.JSX.Element {
  const scrollRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const canSend = message.trim().length > 0 && !isSending;

  async function sendMessage(customMessage?: string): Promise<void> {
    const cleanMessage = (customMessage ?? message).trim();

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
        question: buildGlobalQuestion(cleanMessage),
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
    <SectionCard title="Chat global de Chatzitho">
      <AppText color={colors.text.secondary} variant="caption">
        Puedes consultar sobre cursos, pagos, docentes, estudio, certificaciones
        o dudas académicas generales.
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
              Empieza escribiendo una pregunta o usando una sugerencia.
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
          placeholder="Pregúntale algo a Chatzitho..."
          placeholderTextColor={colors.text.muted}
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />

        <Pressable
          disabled={!canSend}
          onPress={() => {
            void sendMessage();
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

function buildGlobalQuestion(question: string): string {
  return `
Estás respondiendo desde el módulo global Preguntas de Chatzitho.

Este módulo puede ayudar con:
- cursos matriculados;
- horarios;
- docentes;
- pagos;
- estado financiero;
- avance académico;
- próximo ciclo;
- certificaciones;
- dudas académicas generales.

Pregunta del estudiante:
${question}

Instrucciones:
- Responde en español.
- Sé directo y útil.
- Si necesitas datos de cursos, pagos, docentes o estudio, usa el contexto disponible en el backend.
- No inventes información.
- Si falta información, dilo claramente.
- No repitas datos innecesarios.
`.trim();
}

const styles = StyleSheet.create({
  messagesScroll: {
    maxHeight: 420,
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
    minHeight: 96,
    maxHeight: 150,
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