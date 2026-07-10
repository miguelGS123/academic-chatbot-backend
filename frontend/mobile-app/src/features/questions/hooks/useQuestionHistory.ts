import { useCallback, useEffect, useState } from 'react';

import {
  getQuestionSessionMessages,
  getUserQuestionSessions,
} from '@/features/questions/services/questions.service';

import type {
  ChatMessage,
  ChatSession,
} from '@/features/questions/types/question.types';

type UseQuestionHistoryResult = {
  sessions: ChatSession[];
  selectedSessionId: number | null;
  selectedMessages: ChatMessage[];
  isLoadingSessions: boolean;
  isLoadingMessages: boolean;
  error: string | null;
  selectSession: (sessionId: number) => void;
  startNewConversation: () => void;
  registerCreatedSession: (sessionId: number) => Promise<void>;
  refetch: () => Promise<void>;
};

export function useQuestionHistory(
  userId?: number,
): UseQuestionHistoryResult {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null,
  );
  const [selectedMessages, setSelectedMessages] = useState<ChatMessage[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = useCallback(async (): Promise<void> => {
    if (!userId) {
      setSessions([]);
      setSelectedSessionId(null);
      setSelectedMessages([]);
      setError(null);
      return;
    }

    try {
      setIsLoadingSessions(true);
      setError(null);

      const data = await getUserQuestionSessions(userId);

      setSessions(data);

      setSelectedSessionId((currentSessionId) => {
        if (currentSessionId) {
          const sessionStillExists = data.some(
            (session) => session.id === currentSessionId,
          );

          if (sessionStillExists) {
            return currentSessionId;
          }
        }

        return data[0]?.id ?? null;
      });
    } catch {
      setSessions([]);
      setSelectedSessionId(null);
      setSelectedMessages([]);
      setError('No se pudo cargar el historial de conversaciones.');
    } finally {
      setIsLoadingSessions(false);
    }
  }, [userId]);

  const loadMessages = useCallback(
    async (sessionId: number): Promise<void> => {
      try {
        setIsLoadingMessages(true);
        setError(null);

        const data = await getQuestionSessionMessages(sessionId);

        setSelectedMessages(data);
      } catch {
        setSelectedMessages([]);
        setError('No se pudieron cargar los mensajes de la conversación.');
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    if (!selectedSessionId) {
      setSelectedMessages([]);
      return;
    }

    void loadMessages(selectedSessionId);
  }, [loadMessages, selectedSessionId]);

  function selectSession(sessionId: number): void {
    if (sessionId === selectedSessionId) {
      return;
    }

    setSelectedSessionId(sessionId);
  }

  function startNewConversation(): void {
    setSelectedSessionId(null);
    setSelectedMessages([]);
    setError(null);
  }

  async function registerCreatedSession(sessionId: number): Promise<void> {
    setSelectedSessionId(sessionId);

    await loadSessions();
    await loadMessages(sessionId);
  }

  return {
    sessions,
    selectedSessionId,
    selectedMessages,
    isLoadingSessions,
    isLoadingMessages,
    error,
    selectSession,
    startNewConversation,
    registerCreatedSession,
    refetch: loadSessions,
  };
}