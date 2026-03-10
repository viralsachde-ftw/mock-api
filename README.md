# Vessel Call & Manifest Mock API

A Vercel serverless API that generates realistic fake shipping data — vessel call notices and approved cargo manifests — based on real East African port (TZDAR / Dar es Salaam) payload structures.

---

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/data` | One vessel call + one manifest with 5 BL items |
| GET | `/api/data/latest` | 5 latest vessel calls + manifest with 10 BL items (5 newest on top) |

---

## Response Shapes

### `GET /api/data`

```json
{
  "vesselCall": {
    "header": { "interface_id": "...", "send_date_and_time": "...", ... },
    "message_info": { "CarrierId": "DSS", "CallSign": "V2QC6", "EstimatedDatetimeOfArrival": "...", ... }
  },
  "manifest": {
    "Header": { "interface_id": "...", "reference_number": "<uuid>", ... },
    "message_info": {
      "Vessel": { "Mrn": "26DSS000042", "CarrierCode": "DSS", "VesselName": "...", ... },
      "BlList": [ /* 5 items */ ]
    }
  }
}
```

### `GET /api/data/latest`

```json
{
  "vesselCall": {
    "latest": [ /* 5 vessel call objects, newest first */ ],
    "current": { /* single vessel call object */ }
  },
  "manifest": {
    "Header": { ... },
    "message_info": {
      "Vessel": { ... },
      "BlList": [ /* 5 latest (CRN 200–204) then 5 base (CRN 150–199) = 10 total */ ]
    }
  }
}
```

---

## File Structure

```
├── api/
│   ├── data.js              # GET /api/data
│   └── data/
│       └── latest.js        # GET /api/data/latest
├── lib/
│   └── fakers.js            # Reference data, formatters, and generators
├── ship-vessel-call.json    # Real payload sample (vessel call)
├── ship-approverd-manifest.json  # Real payload sample (manifest)
├── package.json
└── vercel.json
```

---

## Local Development

```bash
npm install
npm run dev          # runs: vercel dev
```

Then test:

```bash
curl http://localhost:3000/api/data
curl http://localhost:3000/api/data/latest
```

---

## Deploy

```bash
npx vercel --prod
```

---

## Stack

- **Runtime:** Node.js 20.x (Vercel serverless)
- **Faker:** [`@faker-js/faker`](https://fakerjs.dev/) v9
- **Modules:** ESM (`"type": "module"`)

---

## Generated Data Details

### Vessel Call (`/api/data → vesselCall`)

Mirrors the `CALINF` message type used by TANCIS (Tanzania Customs). Key fields:

- `CallSign` — e.g. `V2QC6`
- `EstimatedDatetimeOfArrival` — always before `EstimatedDatetimeOfDeparture`
- `CarrierId` / `CarrierName` — one of DSS, MSC, CMA, HLC, ONE, PIL, MSK
- `TerminalOperatorCode` / `Terminal` — TZDAR terminal codes (OTZDL008, etc.)
- All cargo quantity fields (`CnQuantity*`, `BkWeight*`, etc.) are `null`

### Manifest (`/api/data → manifest`)

Mirrors the approved manifest structure with vessel info and a `BlList`:

- `Mrn` — e.g. `26DSS000042` (year + carrier code + 6-digit sequence)
- `DepartureDate` always before `ExpectedArrivalDate`
- Each BL item includes:
  - `Crn` — e.g. `26DSS000042-0168`
  - `CargoClassificationCode` — `IM` (Import), `TR` (Transit), or `EX` (Export)
  - `ConsigneeTin` — 9-digit string or `null` (40% chance null)
  - `ContainerList` — 1–3 containers per BL, each with `ContainerSize`, `SealNumber`, weight, volume
  - `VehicleList` — always `[]`

### Latest endpoint (`/api/data/latest`)

The 5 "latest" BL items share the same `Mrn` as the base manifest and use CRN indices 200–204, which are always higher than the base items (150–199), indicating they are newer records.
