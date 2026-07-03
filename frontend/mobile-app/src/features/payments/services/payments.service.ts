import { endpoints } from '@/config/endpoints';
import { apiClient } from '@/shared/services/api-client';

import type { PaymentSummary } from '@/features/payments/types/payment.types';

export async function getPaymentsSummary(
  userId: number,
): Promise<PaymentSummary> {
  return apiClient.get<PaymentSummary>(endpoints.payments.summary(userId));
}