import { generateVesselCall, generateManifest } from '../lib/fakers.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
  res.status(200).json({
    vesselCall: generateVesselCall(),
    manifest: generateManifest(5),
  });
}
