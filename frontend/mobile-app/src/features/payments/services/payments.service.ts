import { endpoints } from '@/config/endpoints';
import { apiClient } from '@/shared/services/api-client';

import type {
  PayPaymentPayload,
  PayPaymentResponse,
  PaymentSummary,
} from '@/features/payments/types/payment.types';

export async function getPaymentsSummary(
  userId: number,
): Promise<PaymentSummary> {
  return apiClient.get<PaymentSummary>(endpoints.payments.summary(userId));
}

export async function payPayment(
  paymentId: number,
  payload: PayPaymentPayload,
): Promise<PayPaymentResponse> {
  return apiClient.post<PayPaymentResponse>(
    endpoints.payments.pay(paymentId),
    payload,
  );
}