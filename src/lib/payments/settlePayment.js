import sql from '@/lib/db';

export async function settlePayment({ providerOrderId, providerPaymentId, gatewayResponse = null }) {
  const gatewayResponseJson = gatewayResponse ? JSON.stringify(gatewayResponse) : null;
  return sql.begin(async (transaction) => {
    const [order] = await transaction`
      SELECT * FROM payment_orders
      WHERE provider_order_id = ${providerOrderId}
      FOR UPDATE
    `;
    if (!order) return { status: 'not_found' };

    if (order.status === 'paid') {
      if (order.provider_payment_id && order.provider_payment_id !== providerPaymentId) {
        return { status: 'conflict' };
      }
      const [invoice] = await transaction`SELECT * FROM invoice_records WHERE id = ${order.invoice_id}`;
      return { status: 'already_settled', order, invoice };
    }

    const [settledOrder] = await transaction`
      UPDATE payment_orders SET
        status = 'paid',
        provider_payment_id = ${providerPaymentId},
        verified = true,
        paid_at = NOW(),
        gateway_response = COALESCE(${gatewayResponseJson}::jsonb, gateway_response),
        updated_at = NOW()
      WHERE id = ${order.id}
      RETURNING *
    `;

    const [invoice] = await transaction`
      UPDATE invoice_records SET
        amount_paid = COALESCE(amount_paid, 0) + ${order.amount},
        amount_due = GREATEST(0, COALESCE(amount_due, 0) - ${order.amount}),
        status = CASE
          WHEN (COALESCE(amount_paid, 0) + ${order.amount}) >= COALESCE(total_amount, 0) THEN 'paid'
          ELSE 'partially_paid'
        END,
        updated_at = NOW()
      WHERE id = ${order.invoice_id}
      RETURNING *
    `;
    if (!invoice) throw new Error('Payment order references a missing invoice.');

    const description = `Payment for ${invoice.invoice_number}`;
    await transaction`
      INSERT INTO accounting_ledger(reference_type, reference_id, account_name, debit, created_by, description)
      VALUES ('payment', ${order.id}, 'Bank Account (Razorpay)', ${order.amount}, ${order.client_user_id}, ${description})
    `;
    await transaction`
      INSERT INTO accounting_ledger(reference_type, reference_id, account_name, credit, created_by, description)
      VALUES ('payment', ${order.id}, 'Accounts Receivable', ${order.amount}, ${order.client_user_id}, ${description})
    `;

    await transaction`
      INSERT INTO progress_logs(project_id, logged_by, log_date, notes)
      SELECT i.source_id, ${order.client_user_id}, CURRENT_DATE,
        ${`Online payment received via Razorpay for invoice ${invoice.invoice_number}`}
      FROM invoice_records i
      JOIN projects p ON p.id = i.source_id
      WHERE i.id = ${invoice.id}
    `;

    return { status: 'settled', order: settledOrder, invoice };
  });
}
