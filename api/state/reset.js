import { initState } from '../../lib/state.js';

// POST /api/state/reset
// Generates a brand-new vessel + manifest, clears all accumulated latest BL items.
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const state = initState();
  const vessel = state.manifest.message_info.Vessel;

  res.status(200).json({
    message: 'State reset. New vessel generated.',
    vessel: {
      mrn: vessel.Mrn,
      name: vessel.VesselName,
      call_sign: vessel.CallSign,
      carrier: vessel.CarrierCode,
      voyage: vessel.VoyageNumber,
    },
    base_bl_count: state.manifest.message_info.BlList.length,
    latest_bl_count: 0,
  });
}
