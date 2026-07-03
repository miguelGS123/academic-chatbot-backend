export type PaymentItem = {
  id?: number;
  concept?: string;
  amount?: number | string;
  due_date?: string | null;
  status?: string | null;
  academic_period?: string | null;
};

export type PaymentSummary = {
  user_id?: number;
  academic_period?: string | null;
  total_amount?: number | string;
  paid_amount?: number | string;
  pending_amount?: number | string;
  overdue_amount?: number | string;
  pending_payments?: PaymentItem[];
  paid_payments?: PaymentItem[];
  overdue_payments?: PaymentItem[];
  message?: string;
  detail?: string;
};