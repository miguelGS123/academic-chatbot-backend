import React from 'react';

import { ContextualMiniChat } from '@/features/questions/components/ContextualMiniChat';

type PaymentMiniChatProps = {
  userId: number;
};

export function PaymentMiniChat({
  userId,
}: PaymentMiniChatProps): React.JSX.Element {
  return (
    <ContextualMiniChat
      userId={userId}
      title="Asistente de pagos"
      description="Consulta cuotas, vencimientos, pagos registrados, comprobantes y códigos de operación."
      emptyMessage="Puedes preguntar cuánto debes, si tienes pagos vencidos o si una cuota ya fue registrada."
      placeholder="Pregunta sobre tus pagos..."
      questionPrefix="Consulta sobre pagos, deuda, cuotas, vencimientos, comprobantes y estado financiero"
      loadingMessage="Chatzitho está revisando tu información financiera..."
    />
  );
}