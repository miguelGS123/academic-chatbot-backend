import React, { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import type { PaymentSummary } from '@/features/payments/types/payment.types';
import { askQuestion } from '@/features/questions/services/questions.service';
import { AppText, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type PaymentMiniChatProps = {
  userId: number;
  summary: PaymentSummary | null;
};

export function PaymentMiniChat({
  userId,
  summary,
}: PaymentMiniChatProps): React.JSX.Element {
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
        question: buildPaymentContextQuestion(cleanMessage, summary),
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
    <SectionCard title="Asistente de pagos">
      <AppText color={colors.text.secondary} variant="caption">
        Consulta tus pagos pendientes, vencimientos o cómo organizar tus cuotas.
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
              Ejemplos: ¿cuánto debo?, ¿tengo pagos vencidos?, ¿qué debo pagar primero?
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

function buildPaymentContextQuestion(
  question: string,
  summary: PaymentSummary | null,
): string {
  return `
Estás respondiendo dentro del módulo Pagos.

Datos financieros disponibles:
- Periodo: ${summary?.academic_period ?? 'No registrado'}
- Total: ${summary?.total_amount ?? 0}
- Pagado: ${summary?.paid_amount ?? 0}
- Pendiente: ${summary?.pending_amount ?? 0}
- Vencido: ${summary?.overdue_amount ?? 0}
- Pagos pendientes: ${JSON.stringify(summary?.pending_payments ?? [])}
- Pagos vencidos: ${JSON.stringify(summary?.overdue_payments ?? [])}
- Historial pagado: ${JSON.stringify(summary?.paid_payments ?? [])}

Pregunta del estudiante:
${question}

Instrucciones:
- Responde directo y breve.
- No repitas todo el resumen financiero.
- Si pregunta cuánto debe, responde el monto pendiente y vencido si aplica.
- Si no hay información suficiente, dilo claramente.
- No inventes pagos, fechas, descuentos, multas ni comprobantes.
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