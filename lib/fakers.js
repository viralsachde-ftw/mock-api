import { faker } from '@faker-js/faker';

// --- Static reference data ---

const CARRIERS = [
  { code: 'DSS', name: 'DIAMOND SHIPPING SERVICES LTD' },
  { code: 'MSC', name: 'MSC MEDITERRANEAN SHIPPING COMPANY' },
  { code: 'CMA', name: 'CMA CGM' },
  { code: 'HLC', name: 'HAPAG-LLOYD AG' },
  { code: 'ONE', name: 'OCEAN NETWORK EXPRESS PTE. LTD.' },
  { code: 'PIL', name: 'PACIFIC INTERNATIONAL LINES' },
  { code: 'MSK', name: 'MAERSK LINE' },
];

const PORTS = [
  { code: 'TZDAR', name: 'Dar es Salaam' },
  { code: 'MYPKG', name: 'Port Klang (Pelabuhan Klang)' },
  { code: 'SGSIN', name: 'Singapore' },
  { code: 'CNSHA', name: 'Shanghai' },
  { code: 'AEJEA', name: 'Jebel Ali' },
  { code: 'INBOM', name: 'Mumbai' },
  { code: 'ZACRP', name: 'Cape Town' },
  { code: 'PKKAR', name: 'Karachi' },
  { code: 'CNNGB', name: 'Ningbo' },
  { code: 'CNQDG', name: 'Qingdao' },
];

const INLAND_PLACES = [
  { code: 'RWKGL', name: 'Kigali' },
  { code: 'ZMLUN', name: 'Lusaka' },
  { code: 'CDFBM', name: 'Lubumbashi' },
  { code: 'UGKLA', name: 'Kampala' },
  { code: 'MWBLZ', name: 'Blantyre' },
  { code: 'BWGBE', name: 'Gaborone' },
  { code: 'ZWHRR', name: 'Harare' },
  { code: 'BIBJM', name: 'Bujumbura' },
];

const DELIVERY_PLACES = [
  { code: 'WITZDL008', name: 'SAID SALIM BAKHRESA & COMPANY LIMITED' },
  { code: 'WITZDL018', name: 'ETC CARGO LIMITED' },
  { code: 'WITZDL022', name: 'TRANSAMI (T) LIMITED' },
  { code: 'WITZDL028', name: 'DIAMOND SHIPPING SERVICES LTD' },
  { code: 'WITZDL032', name: 'AMI TANZANIA LIMITED' },
  { code: 'WITZDL040', name: 'AL-HUSHOOM INVESTMENT (T) LTD' },
  { code: 'WITZDL015', name: 'SIGINON FREIGHT TANZANIA LTD' },
];

const CARGO_CLASSIFICATIONS = [
  { code: 'IM', name: 'Import' },
  { code: 'TR', name: 'Transit' },
  { code: 'EX', name: 'Export' },
];

const SHIPPING_AGENTS = [
  { code: 'ISS', name: 'INCHCAPE SHIPPING SERV (T) LTD' },
  { code: 'DSS', name: 'DIAMOND SHIPPING SERVICES LTD' },
  { code: 'MSC', name: 'MSC MEDITERRANEAN SHIPPING COMPANY' },
  { code: 'PIL', name: 'PACIFIC INTERNATIONAL LINES' },
];

const CONTAINER_SIZES = ['22G1', '42G1', '45G1'];

const VESSEL_NAMES = [
  'CALANDRA', 'MAERSK TOKYO', 'MSC OSCAR', 'EVER GIVEN', 'PIL JAKARTA',
  'CMA CGM LOUIS BLERIOT', 'HAPAG HAMBURG', 'ONE COLUMBIA', 'COSCO SHIPPING UNIVERSE',
  'EVERGREEN MARINE',
];

const NATIONALITIES = ['AG', 'PA', 'LR', 'MH', 'BS', 'CY', 'MT', 'SG', 'HK', 'BM'];

const TERMINAL_OPERATOR_CODES = ['OTZDL008', 'OTZDL012', 'OTZDL015'];
const TERMINAL_CODES = ['WTTZDL008', 'WTTZDL012', 'WTTZDL015'];
const TERMINAL_NAMES = [
  'TANZANIA EAST AFRICA GATEWAY TERMINAL LIMITED',
  'DAR ES SALAAM PORT AUTHORITY',
  'TANZANIA INTERNATIONAL GATEWAY',
];

const PACKAGE_UNITS = ['PT', 'BG', 'PK', 'CN', 'PL', 'CT'];

const GOODS_DESCRIPTIONS = [
  'UNCOATED WOODFREE PAPER',
  'DL-METHIONINE ANIMAL FEED SUPPLEMENT',
  'USED SOLAR PANELS AND ELECTRONICS',
  'FREEZERS AND SPARE PARTS',
  'CHEMICAL PRODUCTS',
  'INDUSTRIAL MACHINERY PARTS',
  'AGRICULTURAL EQUIPMENT',
  'TEXTILE GOODS',
  'VEHICLE SPARE PARTS',
  'FOOD AND BEVERAGE PRODUCTS',
  'PLASTIC MATERIALS AND ARTICLES',
  'STEEL PIPES AND FITTINGS',
];

// --- Utility formatters ---

export function formatSendDateTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  const pad = (n, len = 2) => String(n).padStart(len, '0');
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds()) +
    pad(d.getMilliseconds(), 3)
  );
}

export function fakeInterfaceId(dir = 'E') {
  const num = String(faker.number.int({ min: 1, max: 99 })).padStart(3, '0');
  const suffix = faker.string.alpha({ length: 3, casing: 'upper' });
  return `IF-${dir}-${suffix}-${num}`;
}

export function fakeMrn(carrierCode) {
  const year = String(new Date().getFullYear()).slice(-2);
  const seq = String(faker.number.int({ min: 1, max: 9999 })).padStart(6, '0');
  return `${year}${carrierCode}${seq}`;
}

export function fakeBlNumber(prefix = 'HLC') {
  const origins = ['SIN', 'SYD', 'SHA', 'TA1', 'UTA'];
  const origin = faker.helpers.arrayElement(origins);
  const year = String(new Date().getFullYear()).slice(-2);
  const month = String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0');
  const seq = String(faker.number.int({ min: 10000, max: 999999 }));
  return `${prefix}${origin}${year}${month}${seq}`;
}

export function fakeCrn(mrn, idx) {
  return `${mrn}-${String(idx).padStart(4, '0')}`;
}

export function fakeContainerNumber() {
  const prefix = faker.string.alpha({ length: 4, casing: 'upper' });
  const num = faker.number.int({ min: 1000000, max: 9999999 });
  return `${prefix}${num}`;
}

export function fakeSealNumber() {
  const prefix = faker.string.alpha({ length: 3, casing: 'upper' });
  const num = faker.number.int({ min: 1000000, max: 9999999 });
  return `${prefix}${num}`;
}

export function fakeCallSign() {
  const letter = faker.string.alpha({ length: 1, casing: 'upper' });
  const num = faker.number.int({ min: 1, max: 9 });
  const suffix = faker.string.alphanumeric({ length: 3, casing: 'upper' });
  return `${letter}${num}${suffix}`;
}

export function fakeVoyageNumber() {
  const num = faker.number.int({ min: 100, max: 999 });
  const letter = faker.string.alpha({ length: 1, casing: 'upper' });
  return `${num}${letter}`;
}

// --- Main generators ---

export function generateVesselCall() {
  const carrier = faker.helpers.arrayElement(CARRIERS);
  const now = new Date();
  const arrivalDate = faker.date.soon({ days: 30, refDate: now });
  const departureDate = new Date(
    arrivalDate.getTime() + faker.number.int({ min: 1, max: 3 }) * 24 * 60 * 60 * 1000
  );
  const prepDate = new Date(now.getTime() - faker.number.int({ min: 0, max: 3600000 }));
  const termIdx = faker.number.int({ min: 0, max: TERMINAL_OPERATOR_CODES.length - 1 });
  const depPort = faker.helpers.arrayElement(PORTS.filter(p => p.code !== 'TZDAR'));
  const voyageNum = fakeVoyageNumber();

  return {
    header: {
      interface_id: fakeInterfaceId('E'),
      send_date_and_time: formatSendDateTime(now),
      sender_id: 'TANCIS_ED_SNDR',
      receiver_id: 'TEAGTL_ESWE_025_RCVR',
      reference_number: '',
      ucr_number: '',
    },
    message_info: {
      PreparationDateTime: prepDate.toISOString().slice(0, 19),
      CommunicationAgreedId: String(faker.number.int({ min: 10000, max: 99999 })),
      ControlReferenceNumber: faker.string.uuid(),
      MessageTypeId: 'CALINF',
      MessageFunction: '9',
      VesselMaster: `${faker.person.firstName().toUpperCase()} ${faker.person.lastName().toUpperCase()}`,
      VesselMasterAddress: `: ${faker.internet.email()}`,
      AgentCode: carrier.code,
      AgentAddress: null,
      TerminalOperatorCode: TERMINAL_OPERATOR_CODES[termIdx],
      TransportStageType: 'MAIN_TRANSPORT',
      VoyageNumber: voyageNum,
      ModeOfTransportCoded: 'MARITIME_TRANSPORT',
      ModeOfTransport: '1',
      CarrierId: carrier.code,
      CarrierName: carrier.name,
      CallSign: fakeCallSign(),
      TransportMeansId: String(faker.number.int({ min: 1000000, max: 9999999 })),
      TransportMeansName: faker.helpers.arrayElement(VESSEL_NAMES),
      TransportMeansNationality: faker.helpers.arrayElement(NATIONALITIES),
      VoyageNumberOutbound: voyageNum,
      Terminal: TERMINAL_CODES[termIdx],
      RotationNumber: null,
      BerthNo: null,
      Ballast: false,
      OutwardCargo: false,
      DestinationPort: 'TZDAR',
      PortOfCall: depPort.code,
      NextPortOfCall: depPort.code,
      CustomOfficeCode: 'TZDL',
      EstimatedDatetimeOfDeparture: departureDate.toISOString().slice(0, 19),
      ActualDatetimeOfDeparture: null,
      ActualDatetimeOfDepartureOuterAnchorage: null,
      HandoverDatetime: null,
      EstimatedDatetimeOfArrival: arrivalDate.toISOString().slice(0, 19),
      ActualDatetimeOfArrival: null,
      ActualDatetimeOfArrivalOuterAnchorage: null,
      DraftFore: parseFloat(faker.number.float({ min: 8, max: 14, fractionDigits: 1 })),
      DraftForeUnit: 'MTR',
      DraftAfter: parseFloat(faker.number.float({ min: 8, max: 14, fractionDigits: 1 })),
      DraftAfterUnit: 'MTR',
      CnQuantityLoaded: null,
      CnQuantityAtDischarge: null,
      CnQuantityAtDestination: null,
      CnWeightLoaded: null,
      CnWeightAtDischarge: null,
      CnWeightAtDestination: null,
      BkQuantityLoaded: null,
      BkQuantityAtDischarge: null,
      BkQuantityAtDestination: null,
      BkWeightLoaded: null,
      BkWeightAtDischarge: null,
      BkWeightAtDestination: null,
      CarQuantityLoaded: null,
      CarQuantityAtDischarge: null,
      CarQuantityAtDestination: null,
      CarWeightLoaded: null,
      CarWeightAtDischarge: null,
      CarWeightAtDestination: null,
    },
  };
}

export function generateBlItem(mrn, crnIndex) {
  const carrierCode = mrn.replace(/^\d{2}/, '').replace(/\d+$/, '');
  const blPrefixMap = { HLC: 'HLC', MSC: 'MSCU', ONE: 'ONEY', CMA: 'CMAU', MSK: 'MAEU' };
  const blPrefix = blPrefixMap[carrierCode] || carrierCode;

  const cargoClass = faker.helpers.arrayElement(CARGO_CLASSIFICATIONS);
  const isTransit = cargoClass.code === 'TR';

  const loadingPort = faker.helpers.arrayElement(PORTS.filter(p => p.code !== 'TZDAR'));
  const destPlace = isTransit
    ? faker.helpers.arrayElement(INLAND_PLACES)
    : { code: 'TZDAR', name: 'Dar es Salaam' };
  const deliveryPlace = faker.helpers.arrayElement(DELIVERY_PLACES);
  const shippingAgent = faker.helpers.arrayElement(SHIPPING_AGENTS);

  const packageUnit = faker.helpers.arrayElement(PACKAGE_UNITS);
  const pkgCount = faker.number.int({ min: 1, max: 2000 });
  const netWeight = parseFloat(faker.number.float({ min: 1000, max: 50000, fractionDigits: 1 }).toFixed(1));
  const grossWeight = parseFloat((netWeight * faker.number.float({ min: 1.01, max: 1.05, fractionDigits: 3 })).toFixed(1));
  const volume = parseFloat(faker.number.float({ min: 10, max: 400, fractionDigits: 2 }).toFixed(2));

  const containerCount = faker.number.int({ min: 1, max: 3 });
  const sealBase = fakeSealNumber();

  const containers = Array.from({ length: containerCount }, () => ({
    ContainerNumber: fakeContainerNumber(),
    ContainerSize: faker.helpers.arrayElement(CONTAINER_SIZES),
    SealNumber1: sealBase,
    SealNumber2: sealBase,
    SealNumber3: sealBase,
    FreightIndicator: 'FCL',
    ContainerPackage: Math.floor(pkgCount / containerCount),
    PackageUnit: packageUnit,
    Weight: parseFloat((grossWeight / containerCount).toFixed(1)),
    WeightUnit: 'KG',
    Volume: parseFloat((volume / containerCount).toFixed(2)),
    VolumeUnit: 'CBM',
    ReferPlugYn: 'N',
    MinTemp: 0.0,
    MaxTemp: 0.0,
  }));

  const hasTin = faker.number.float() > 0.4;
  const consigneeName = faker.company.name().toUpperCase();
  const notifyName = consigneeName.slice(0, 20);
  const consigneeAddress = faker.location.streetAddress().toUpperCase();
  const consigneeTel = faker.phone.number({ style: 'international' }).replace(/\D/g, '');

  return {
    BlNumber: fakeBlNumber(blPrefix),
    MasterBlNumber: fakeBlNumber(blPrefix),
    HouseBlNumber: 'SIMPLE',
    Crn: fakeCrn(mrn, crnIndex),
    BlType: 'HOUSE',
    LoadingPortCode: loadingPort.code,
    LoadingPortName: loadingPort.name,
    DestinationPlaceCode: destPlace.code,
    DestinationPlaceName: destPlace.name,
    DeliveryPlaceCode: deliveryPlace.code,
    DeliveryPlaceName: deliveryPlace.name,
    CargoClassificationCode: cargoClass.code,
    CargoClassificationName: cargoClass.name,
    ShippingAgentCode: shippingAgent.code,
    ShippingAgentName: shippingAgent.name,
    ForwarderCode: null,
    ForwarderName: null,
    ForwarderTel: null,
    ExporterName: faker.company.name().toUpperCase().slice(0, 20),
    ExporterAddress: faker.location.streetAddress().toUpperCase(),
    ExporterTel: faker.phone.number({ style: 'international' }).replace(/\D/g, ''),
    ConsigneeTin: hasTin ? String(faker.number.int({ min: 100000000, max: 999999999 })) : null,
    ConsigneeName: consigneeName,
    ConsigneeAddress: consigneeAddress,
    ConsigneeTel: consigneeTel,
    NotifyName: notifyName,
    NotifyAddress: consigneeName,
    NotifyTel: consigneeTel,
    GoodsDescription: faker.helpers.arrayElement(GOODS_DESCRIPTIONS),
    BlPackage: pkgCount,
    PackageUnit: packageUnit,
    BlNetWeight: netWeight,
    BlGrossWeight: grossWeight,
    WeightUnit: 'KG',
    BlGrossVolume: volume,
    VolumeUnit: 'CBM',
    ImdgCode: null,
    PackingUnitCode: 'C',
    PackingUnitName: 'Container',
    OilTypeCode: null,
    OilTypeName: null,
    ShippingMarks: null,
    ContainerList: containers,
    VehicleList: [],
  };
}

export function generateManifest(blCount = 5) {
  const carrier = faker.helpers.arrayElement(CARRIERS);
  const now = new Date();
  const departureDate = faker.date.recent({ days: 30, refDate: now });
  const arrivalDate = new Date(
    departureDate.getTime() + faker.number.int({ min: 7, max: 21 }) * 24 * 60 * 60 * 1000
  );
  const approvalDate = new Date(arrivalDate.getTime() - faker.number.int({ min: 0, max: 3600000 }));

  const mrn = fakeMrn(carrier.code);
  const termIdx = faker.number.int({ min: 0, max: TERMINAL_OPERATOR_CODES.length - 1 });
  const depPort = faker.helpers.arrayElement(PORTS.filter(p => p.code !== 'TZDAR'));
  const startCrn = faker.number.int({ min: 150, max: 199 });

  return {
    Header: {
      interface_id: fakeInterfaceId('I'),
      send_date_and_time: formatSendDateTime(now),
      sender_id: 'TANCIS_ED_SNDR',
      receiver_id: 'TEAGTL_CGMI_051_RCVR',
      reference_number: faker.string.uuid(),
      ucr_number: '',
    },
    message_info: {
      Vessel: {
        Mrn: mrn,
        ApprovalDate: approvalDate.toISOString().slice(0, 19),
        CarrierCode: carrier.code,
        CarrierName: carrier.name,
        CallSign: fakeCallSign(),
        VesselName: faker.helpers.arrayElement(VESSEL_NAMES),
        VoyageNumber: fakeVoyageNumber(),
        TpaUid: String(faker.number.int({ min: 10000, max: 99999 })),
        DeparturePortCode: depPort.code,
        DeparturePortName: depPort.name,
        DischargePortCode: 'TZDAR',
        DischargePortName: 'Dar es Salaam',
        TerminalCode: TERMINAL_CODES[termIdx],
        TerminalName: TERMINAL_NAMES[termIdx],
        InBallastYn: null,
        TransportMeansId: String(faker.number.int({ min: 1000000, max: 9999999 })),
        TransportMeansNationality: faker.helpers.arrayElement(NATIONALITIES),
        NextPortOfCall: null,
        DepartureDate: departureDate.toISOString().slice(0, 19),
        ExpectedArrivalDate: arrivalDate.toISOString().slice(0, 19),
        Status: null,
      },
      BlList: Array.from({ length: blCount }, (_, i) => generateBlItem(mrn, startCrn + i)),
    },
  };
}
