/**
 * The Medicine interface represents the structure of a medicine object, which includes various properties such as brand name, code, dosage, events related to the medicine, form, ID, registration details, laboratory information, origin, packaging, and status. The MedicineEvent interface represents specific events related to the medicine, such as nomenclature updates, withdrawals, or non-renewals. Each event includes details about the event type, status, and relevant dates or observations.
 * @interface Medicine
 * @property {string} brandName - The brand name of the medicine.
 * @property {string} code - The unique code associated with the medicine.
 * @property {string} dosage - The dosage information for the medicine.
 * @property {MedicineEvent[]} event - An array of events related to the medicine, such as nomenclature updates, withdrawals, or non-renewals.
 * @property {string} form - The form in which the medicine is available (e.g., tablet, liquid).
 * @property {string} id - The unique identifier for the medicine.
 * @property {string} initialRegistrationDate - The date when the medicine was initially registered.
 * @property {string} internationalCommonDenomination - The international common denomination of the medicine.
 * @property {string} laboratoryCountry - The country where the laboratory that produces the medicine is located.
 * @property {string} laboratoryHolder - The name of the laboratory holder responsible for the medicine.
 * @property {string} list - The list category to which the medicine belongs (e.g., essential medicines list).
 * @property {MedicineOrigin} origin - The origin of the medicine (e.g., manufactured, imported).
 * @property {string} p1 - Additional property 1 (purpose can be defined based on specific requirements).
 * @property {string} p2 - Additional property 2 (purpose can be defined based on specific requirements).
 * @property {string} packaging - The packaging details of the medicine.
 * @property {string} registrationNumber - The registration number assigned to the medicine.
 * @property {MedicineStatus} status - The current status of the medicine (e.g., active, withdrawn).
 * @property {MedicineType} type - The type or category of the medicine.
 * @example
 * const exampleMedicine: Medicine = {
 *   brandName: "ExampleBrand",
 *   code: "EX123",
 *   dosage: "500mg",
 *   event: [
 *     {
 *       finalRegistrationDate: "2023-01-01",
 *       stabilityDuration: "2 years",
 *       eventType: MedicineEventType.UPSERT,
 *       observations: "No issues observed.",
 *       status: MedicineStatus.ACTIVE,
 *     },
 *     {
 *       eventType: MedicineEventType.WITHDRAWAL,
 *       status: MedicineStatus.WITHDRAWN,
 *       withdrawalDate: "2024-01-01",
 *       withdrawalReason: "Safety concerns",
 *     },
 *   ],
 *   form: "Tablet",
 *   id: "1",
 *   initialRegistrationDate: "2023-01-01",
 *   internationalCommonDenomination: "ExampleDenomination",
 *   laboratoryCountry: "CountryX",
 *   laboratoryHolder: "ExampleLab",
 *   list: "Essential Medicines List",
 *   origin: MedicineOrigin.MANUFACTURED,
 *   p1: "Additional info 1",
 *   p2: "Additional info 2",
 *   packaging: "Box of 20  tablets",
 *   registrationNumber: "REG123456",
 *  status: MedicineStatus.ACTIVE,
 *  type: MedicineType.BIO,
 * };
 * @see {@link MedicineEvent} for the structure of events related to the medicine.
 */
export interface Medicine {
  brandName: string;
  code: string;
  dosage: string;
  event: MedicineEvent[];
  form: string;
  id: string;
  initialRegistrationDate: string;
  internationalCommonDenomination: string;
  laboratoryCountry: string;
  laboratoryHolder: string;
  list: string;
  origin: MedicineOrigin;
  p1: string;
  p2: string;
  packaging: string;
  registrationNumber: string;
  status: MedicineStatus;
  type: MedicineType;
}

/**
 * The MedicineEvent interface represents an event related to a medicine, such as a nomenclature event, withdrawal event, or non-renewal event. It includes properties that describe the details of the event, such as the final registration date, stability duration, event type, observations, status, withdrawal date, and withdrawal reason.
 * @interface MedicineEvent
 * @property {string} [finalRegistrationDate] - The date when the medicine's registration was finalized (optional).
 * @property {string} [stabilityDuration] - The duration for which the medicine is considered stable (optional).
 * @property {MedicineEventType} eventType - The type of event (e.g., MedicineEventType.UPSERT, MedicineEventType.WITHDRAWAL, MedicineEventType.NON_RENEWAL).
 * @property {string} [observations] - Any additional observations related to the event (optional).
 * @property {MedicineStatus} status - The current status of the medicine after the event.
 * @property {string} [withdrawalDate] - The date when the medicine was withdrawn from the market (optional, applicable for withdrawal events).
 * @property {string} [withdrawalReason] - The reason for withdrawing the medicine from the market (optional, applicable for withdrawal events).
 * @example
 * const exampleEvent: MedicineEvent = {
 *   finalRegistrationDate: "2023-01-01",
 *   stabilityDuration: "2 years",
 *   eventType: MedicineEventType.UPSERT,
 *   observations: "No issues observed.",
 *   status: MedicineStatus.ACTIVE,
 * };
 * const withdrawalEvent: MedicineEvent = {
 *   eventType: MedicineEventType.WITHDRAWAL,
 *   status: MedicineStatus.WITHDRAWN,
 *   withdrawalDate: "2024-01-01",
 *   withdrawalReason: "Safety concerns",
 * };
 * @example
 * const nonRenewalEvent: MedicineEvent = {
 *   eventType: MedicineEventType.NON_RENEWAL,
 *   status: MedicineStatus.MARKED_NOT_RENEWED,
 *   finalRegistrationDate: "2022-01-01",
 *   observations: "The medicine was not renewed due to low demand.",
 * };
 * @see {@link Medicine} for the main medicine interface that includes an array of MedicineEvent objects.
 */
export interface MedicineEvent {
  finalRegistrationDate?: string;
  stabilityDuration?: string;
  eventType: MedicineEventType;
  observations?: string;
  status: MedicineStatus;
  withdrawalDate?: string;
  withdrawalReason?: string;
}

/**
 * @constant {Object} MedicineEventType - An object containing the possible event types for medicine events, such as UPSERT (update or insert), WITHDRAWAL (removal from the market), and NON_RENEWAL (not renewing the registration).
 */
const MedicineEventType = {
  UPSERT: 'UPSERT',
  WITHDRAWAL: 'WITHDRAWAL',
  NON_RENEWAL: 'NON_RENEWAL',
} as const;

/**
 * @typedef {string} MedicineEventType - A type representing the possible event types for medicine events, derived from the MedicineEventType constant object.
 * @example
 * const exampleEventType: MedicineEventType = MedicineEventType.UPSERT;
 * const anotherEventType: MedicineEventType = MedicineEventType.WITHDRAWAL;
 * const nonRenewalEventType: MedicineEventType = MedicineEventType.NON_RENEWAL;
 */
export type MedicineEventType = (typeof MedicineEventType)[keyof typeof MedicineEventType];

/**
 * @constant {Object} MedicineStatus - An object containing the possible statuses for medicines, such as ACTIVE (currently available), WITHDRAWN (removed from the market), and MARKED_NOT_RENEWED (marked as not renewed).
 */
export const MedicineStatus = {
  ACTIVE: 'ACTIVE',
  WITHDRAWN: 'WITHDRAWN',
  MARKED_NOT_RENEWED: 'MARKED_NOT_RENEWED',
} as const;

/**
 * @typedef {string} MedicineStatus - A type representing the possible statuses for medicines, derived from the MedicineStatus constant object.
 * @example
 * const activeStatus: MedicineStatus = MedicineStatus.ACTIVE;
 * const withdrawnStatus: MedicineStatus = MedicineStatus.WITHDRAWN;
 * const notRenewedStatus: MedicineStatus = MedicineStatus.MARKED_NOT_RENEWED;
 */
export type MedicineStatus = (typeof MedicineStatus)[keyof typeof MedicineStatus];

/**
 * @constant {Object} MedicineOrigin - An object containing the possible origins for medicines, such as MANUFACTURED (produced domestically) and IMPORTED (brought in from another country).
 */
export const MedicineOrigin = {
  MANUFACTURED: 'MANUFACTURED',
  IMPORTED: 'IMPORTED',
} as const;

/**
 * @typedef {string} MedicineOrigin - A type representing the possible origins for medicines, derived from the MedicineOrigin constant object.
 * @example
 * const manufacturedOrigin: MedicineOrigin = MedicineOrigin.MANUFACTURED;
 * const importedOrigin: MedicineOrigin = MedicineOrigin.IMPORTED;
 */
export type MedicineOrigin = (typeof MedicineOrigin)[keyof typeof MedicineOrigin];

/**
 * @constant {Object} MedicineType - An object containing the possible types for medicines, such as GE (generic), RE (reference), and BIO (biological).
 */
const MedicineType = {
  GE: 'GE',
  RE: 'RE',
  BIO: 'BIO',
} as const;

/**
 * @typedef {string} MedicineType - A type representing the possible types for medicines, derived from the MedicineType constant object.
 * @example
 * const genericType: MedicineType = MedicineType.GE;
 * const referenceType: MedicineType = MedicineType.RE;
 * const biologicalType: MedicineType = MedicineType.BIO;
 */
export type MedicineType = (typeof MedicineType)[keyof typeof MedicineType];
