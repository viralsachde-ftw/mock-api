import { faker } from '@faker-js/faker';
import { getOrInitState } from '../lib/state.js';
import { generateCro } from '../lib/fakers.js';

// GET /api/cro
// Optional query param: ?status=D01|P01|P02|R01|H01
// CRO is linked to a random BL from the current vessel's manifest.
export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const { manifest } = getOrInitState();
  const allBl = [
    ...manifest.message_info.BlList,
  ];

  const linkedBl = faker.helpers.arrayElement(allBl);
  const cro = generateCro(req.query.status ?? null);

  // Attach the linked BL/CRN reference so consumers can correlate
  cro.message_info.linked_crn   = linkedBl.Crn;
  cro.message_info.linked_bl    = linkedBl.BlNumber;
  cro.message_info.vessel_mrn   = manifest.message_info.Vessel.Mrn;

  res.status(200).json(cro);
}
