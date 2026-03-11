import { getOrInitState, appendLatestBlItems } from '../../lib/state.js';

// POST /api/latest/add
// Appends 5 new BL items to the latest list and persists them.
// These items will appear in GET /api/data/latest and GET /api/manifest/latest.
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const state = getOrInitState();
  const { state: updated, newItems } = appendLatestBlItems(state);

  res.status(200).json({
    message: '5 BL items added to latest list.',
    added: newItems,
    meta: {
      latest_bl_count: updated.latestBlItems.length,
      total_bl_count: updated.latestBlItems.length + updated.manifest.message_info.BlList.length,
      next_crn_index: updated.nextCrnIndex,
    },
  });
}
