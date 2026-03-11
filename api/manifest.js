import { getOrInitState } from '../lib/state.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  const { manifest } = getOrInitState();
  res.status(200).json(manifest);
}
