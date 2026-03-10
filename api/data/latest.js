import { generateVesselCall, generateManifest, generateBlItem } from '../../lib/fakers.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const baseManifest = generateManifest(5);
  const mrn = baseManifest.message_info.Vessel.Mrn;

  // 5 new BL items prepended (newest first, CRN index offset 200+)
  const latestBlItems = Array.from({ length: 5 }, (_, i) => generateBlItem(mrn, 200 + i));

  res.status(200).json({
    vesselCall: {
      latest: Array.from({ length: 5 }, () => generateVesselCall()),
      current: generateVesselCall(),
    },
    manifest: {
      ...baseManifest,
      message_info: {
        ...baseManifest.message_info,
        BlList: [...latestBlItems, ...baseManifest.message_info.BlList],
      },
    },
  });
}
