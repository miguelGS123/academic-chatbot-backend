import { useCallback, useEffect, useState } from 'react';

import { getPaymentsSummary } from '@/features/payments/services/payments.service';
import type { PaymentSummary } from '@/features/payments/types/payment.types';

type UsePaymentsSummaryResult = {
  summary: PaymentSummary | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function usePaymentsSummary(
  userId?: number,
): UsePaymentsSummaryResult {
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    if (!userId) {
      setSummary(null);
      setIsLoading(false);
      setError('No se encontró el usuario autenticado.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getPaymentsSummary(userId);

      setSummary(data);
    } catch {
      setError('No se pudo cargar tu información de pagos.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  return {
    summary,
    isLoading,
    error,
    refetch: loadSummary,
  };
}