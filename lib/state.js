import fs from 'fs';
import path from 'path';
import os from 'os';
import { generateVesselCall, generateManifest, generateBlItem } from './fakers.js';

const STATE_FILE = path.join(os.tmpdir(), 'vessel-mock-state.json');

export function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    }
  } catch {
    // corrupted — fall through to init
  }
  return null;
}

export function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

/**
 * Generate a fresh state where vesselCall and manifest share the same vessel details.
 */
export function initState() {
  const manifest = generateManifest(5);
  const v = manifest.message_info.Vessel;

  // Override vesselCall fields to match the manifest's vessel
  const vesselCall = generateVesselCall();
  Object.assign(vesselCall.message_info, {
    CallSign:                    v.CallSign,
    TransportMeansName:          v.VesselName,
    TransportMeansId:            v.TransportMeansId,
    TransportMeansNationality:   v.TransportMeansNationality,
    CarrierId:                   v.CarrierCode,
    CarrierName:                 v.CarrierName,
    AgentCode:                   v.CarrierCode,
    VoyageNumber:                v.VoyageNumber,
    VoyageNumberOutbound:        v.VoyageNumber,
    PortOfCall:                  v.DeparturePortCode,
    NextPortOfCall:              v.DeparturePortCode,
    EstimatedDatetimeOfArrival:  v.ExpectedArrivalDate,
    EstimatedDatetimeOfDeparture: v.DepartureDate,
  });

  const state = {
    vesselCall,
    manifest,
    latestBlItems: [],  // grows by 5 each POST /api/latest/add
    nextCrnIndex: 200,
  };
  saveState(state);
  return state;
}

export function getOrInitState() {
  return loadState() ?? initState();
}

/**
 * Append 5 new BL items to latestBlItems (newest first).
 * Returns { state, newItems }.
 */
export function appendLatestBlItems(state) {
  const mrn = state.manifest.message_info.Vessel.Mrn;
  const newItems = Array.from({ length: 5 }, (_, i) =>
    generateBlItem(mrn, state.nextCrnIndex + i)
  );
  state.latestBlItems = [...newItems, ...state.latestBlItems];
  state.nextCrnIndex += 5;
  saveState(state);
  return { state, newItems };
}

/**
 * Build the manifest response with latestBlItems prepended to BlList.
 */
export function manifestWithLatest(state) {
  return {
    ...state.manifest,
    message_info: {
      ...state.manifest.message_info,
      BlList: [...state.latestBlItems, ...state.manifest.message_info.BlList],
    },
  };
}
