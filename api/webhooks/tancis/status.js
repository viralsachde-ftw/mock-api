import { formatSendDateTime } from '../../../lib/fakers.js';

const VALID_STATUS_CODES = ['D01', 'P01', 'P02', 'R01', 'H01'];

// POST /webhooks/tancis/status  (Interface ID: IF-E-PTL-001)
// Accepts a TANCIS CRO / Processing Status notification and returns an ACK.
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const body = req.body;

  // Basic structural validation
  const interfaceId = body?.header?.interface_id;
  const statusCode = body?.message_info?.processing_status_code;
  const tancisRef = body?.message_info?.tancis_reference_number;

  if (!interfaceId || !statusCode || !tancisRef) {
    return res.status(400).json({
      status: 'ERROR',
      error: 'Missing required fields: header.interface_id, message_info.processing_status_code, message_info.tancis_reference_number',
    });
  }

  if (!VALID_STATUS_CODES.includes(statusCode)) {
    return res.status(422).json({
      status: 'ERROR',
      error: `Unknown processing_status_code "${statusCode}". Valid codes: ${VALID_STATUS_CODES.join(', ')}`,
    });
  }

  const now = new Date();

  return res.status(200).json({
    status: 'ACKNOWLEDGED',
    interface_id: interfaceId,
    tancis_reference_number: tancisRef,
    processing_status_code: statusCode,
    acknowledged_at: formatSendDateTime(now),
    receiver_id: body?.header?.receiver_id ?? 'PCS',
    message: statusCode === 'D01'
      ? 'CRO received. KEY 1 unlocked for PCS processing.'
      : `Status "${statusCode}" recorded successfully.`,
  });
}
