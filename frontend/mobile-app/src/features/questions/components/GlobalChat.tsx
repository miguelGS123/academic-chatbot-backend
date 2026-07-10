import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { askQuestion } from '@/features/questions/services/questions.service';
import type { ChatMessage as ApiChatMessage } from '@/features/questions/types/question.types';
import { AppText, SectionCard } from '@/shared/components';
import { colors, radius, spacing } from '@/shared/theme';

export type GlobalChatRef = {
  sendSuggestedQuestion: (question: string) => void;
  startNewConversation: () => void;
};

type DisplayChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type GlobalChatProps = {
  userId: number;
  initialSessionId?: number | null;
  initialMessages?: ApiChatMessage[];
  onSessionCreated?: (sessionId: number) => void;
  onNewConversation?: () => void;
};

function mapApiMessages(
  messages: ApiChatMessage[],
): DisplayChatMessage[] {
  return messages.map((item) => ({
    id: String(item.id),
    role: item.role,
    text: item.message,
  }));
}

export const GlobalChat = forwardRef<GlobalChatRef, GlobalChatProps>(
  function GlobalChat(
    {
      userId,
      initialSessionId = null,
      initialMessages = [],
      onSessionCreated,
      onNewConversation,
    },
    ref,
  ): React.JSX.Element {
    const scrollRef = useRef<ScrollView>(null);

    const [message, setMessage] = useState('');
    const [sessionId, setSessionId] = useState<number | null>(
      initialSessionId,
    );

    const [messages, setMessages] = useState<DisplayChatMessage[]>(
      mapApiMessages(initialMessages),
    );

    const [isSending, setIsSending] = useState(false);

    const canSend = message.trim().length > 0 && !isSending;

    useEffect(() => {
      setSessionId(initialSessionId);
      setMessages(mapApiMessages(initialMessages));

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }, [initialMessages, initialSessionId]);

    useImperativeHandle(ref, () => ({
      sendSuggestedQuestion: (question: string) => {
        void sendMessage(question);
      },

      startNewConversation: () => {
        handleNewConversation();
      },
    }));

    function handleNewConversation(): void {
      setSessionId(null);
      setMessages([]);
      setMessage('');
      onNewConversation?.();
    }

    async function sendMessage(customMessage?: string): Promise<void> {
      const cleanMessage = (customMessage ?? message).trim();

      if (!cleanMessage || isSending) {
        return;
      }

      const userMessage: DisplayChatMessage = {
        id: `${Date.now()}-user`,
        role: 'user',
        text: cleanMessage,
      };

      setMessages((current) => [...current, userMessage]);
      setMessage('');
      setIsSending(true);

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);

      try {
        const response = await askQuestion({
          user_id: userId,
          question: cleanMessage,
          session_id: sessionId,
        });

        if (!sessionId) {
          setSessionId(response.session_id);
          onSessionCreated?.(response.session_id);
        }

        const assistantMessage: DisplayChatMessage = {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          text: response.answer,
        };

        setMessages((current) => [...current, assistantMessage]);
      } catch {
        const errorMessage: DisplayChatMessage = {
          id: `${Date.now()}-error`,
          role: 'assistant',
          text:
            'No pude responder en este momento. Verifica la conexión con el backend e inténtalo nuevamente.',
        };

        setMessages((current) => [...current, errorMessage]);
      } finally {
        setIsSending(false);

        setTimeout(() => {
          scrollRef.current?.scrollToEnd({ animated: true });
        }, 150);
      }
    }

    return (
      <SectionCard title="Chatzitho">
        <AppText color={colors.text.secondary} variant="caption">
          Consulta cualquier tema relacionado con tus cursos, docentes, pagos,
          avance académico, certificaciones o información institucional.
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
              <AppText color={colors.text.primary} variant="body">
                ¿En qué puedo ayudarte?
              </AppText>

              <AppText color={colors.text.muted} variant="caption">
                Escribe una consulta académica para comenzar una conversación.
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
            <View
              style={[
                styles.messageBubble,
                styles.assistantBubble,
                styles.typingBubble,
              ]}
            >
              <AppText color={colors.text.muted} variant="caption">
                Chatzitho está escribiendo...
              </AppText>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            editable={!isSending}
            multiline
            placeholder="Escribe tu pregunta..."
            placeholderTextColor={colors.text.muted}
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />

          <Pressable
            accessibilityRole="button"
            disabled={!canSend}
            onPress={() => {
              void sendMessage();
            }}
            style={({ pressed }) => [
              styles.sendButton,
              !canSend ? styles.sendButtonDisabled : null,
              pressed && canSend ? styles.sendButtonPressed : null,
            ]}
          >
            <AppText color={colors.text.inverse} variant="body">
              {isSending ? 'Procesando...' : 'Enviar'}
            </AppText>
          </Pressable>
        </View>
      </SectionCard>
    );
  },
);

const styles = StyleSheet.create({
  messagesScroll: {
    height: 430,
  },

  messagesContent: {
    flexGrow: 1,
    gap: spacing.sm,
    justifyContent: 'flex-end',
    paddingVertical: spacing.sm,
  },

  emptyChat: {
    gap: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.secondary,
    padding: spacing.lg,
  },

  messageBubble: {
    maxWidth: '90%',
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

  typingBubble: {
    opacity: 0.85,
  },

  inputContainer: {
    gap: spacing.sm,
  },

  input: {
    minHeight: 64,
    maxHeight: 130,
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

  sendButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
});