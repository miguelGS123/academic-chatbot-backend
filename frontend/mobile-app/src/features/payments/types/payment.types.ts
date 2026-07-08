export type PaymentItem = {
  id: number;
  user_id: number;
  concept: string;
  amount: number | string;
  due_date?: string | null;
  stored_status: string;
  calculated_status: string;
  academic_period_code?: string | null;
  academic_period_name?: string | null;
  payment_type?: string | null;
  days_overdue?: number | null;
  days_until_due?: number | null;
};

export type PaymentHistoryItem = {
  id: number;
  user_id: number;
  payment_id?: number | null;
  amount_paid: number | string;
  paid_at: string;
  operation_code?: string | null;
  receipt_url?: string | null;
  status: string;
  payment_method?: string | null;
};

export type PaymentSummary = {
  user_id: number;
  academic_period_code?: string | null;
  academic_period_name?: string | null;
  cycle_total_amount: number | string;
  total_paid: number | string;
  total_pending: number | string;
  total_overdue: number | string;
  next_payment_concept?: string | null;
  next_payment_amount?: number | string | null;
  next_payment_due_date?: string | null;
  financial_status: string;
  pending_payments: PaymentItem[];
  overdue_payments: PaymentItem[];
  payment_history: PaymentHistoryItem[];
};

export type PayPaymentPayload = {
  payment_method_code: string;
  card_holder: string;
  card_last_four: string;
  confirmation_note?: string | null;
};

export type PayPaymentResponse = {
  payment_id: number;
  user_id: number;
  amount_paid: number | string;
  operation_code: string;
  paid_at: string;
  status: string;
  message: string;
};