import { getOrInitState, manifestWithLatest } from '../../lib/state.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const state = getOrInitState();

  res.status(200).json({
    vesselCall: state.vesselCall,
    manifest: manifestWithLatest(state),
    meta: {
      base_bl_count: state.manifest.message_info.BlList.length,
      latest_bl_count: state.latestBlItems.length,
      total_bl_count: state.latestBlItems.length + state.manifest.message_info.BlList.length,
      next_crn_index: state.nextCrnIndex,
    },
  });
}
