import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Medicine as MedicineModel, MedicineOrigin, MedicineStatus } from '../../model/medicine';

const MEDICINE_FIELDS = gql`
  fragment MedicineFields on Medicine {
    brandName
    code
    dosage
    event {
      ... on NomenclatureEvent {
        finalRegistrationDate
        stabilityDuration
        eventType
        observations
        status
      }
      ... on WithdrawalEvent {
        withdrawalDate
        withdrawalReason
        eventType
        status
      }
      ... on NonRenewalEvent {
        finalRegistrationDate
        observations
        eventType
        status
      }
    }
    form
    id
    initialRegistrationDate
    internationalCommonDenomination
    laboratoryCountry
    laboratoryHolder
    list
    origin
    p1
    p2
    packaging
    registrationNumber
    status
    type
  }
`;

const GET_MEDICINES_BY_BRAND_NAME = gql`
  query GetMedicinesByBrandName($brandName: String!) {
    medicinesByBrandName(brandName: $brandName) {
      ...MedicineFields
    }
  }
  ${MEDICINE_FIELDS}
`;

const GET_MEDICINES_BY_CODE = gql`
  query GetMedicinesByCode($code: String!) {
    medicinesByCode(code: $code) {
      ...MedicineFields
    }
  }
  ${MEDICINE_FIELDS}
`;

const GET_MEDICINES_BY_ICD = gql`
  query GetMedicinesByIcd($icd: String!) {
    medicinesByIcd(icd: $icd) {
      ...MedicineFields
    }
  }
  ${MEDICINE_FIELDS}
`;

const GET_MEDICINES_BY_LABORATORY_HOLDER = gql`
  query GetMedicinesByLaboratoryHolder($laboratoryHolder: String!) {
    medicinesByLaboratoryHolder(laboratoryHolder: $laboratoryHolder) {
      ...MedicineFields
    }
  }
  ${MEDICINE_FIELDS}
`;

const GET_MEDICINES_BY_REGISTRATION_NUMBER = gql`
  query GetMedicineByRegistrationNumber($registrationNumber: String!) {
    medicineByRegistrationNumber(registrationNumber: $registrationNumber) {
      ...MedicineFields
    }
  }
  ${MEDICINE_FIELDS}
`;

const SEARCH_MEDICINES = gql`
  query SearchMedicines(
    $filter: MedicineSearchFilter!
    $first: Int
    $after: String
    $last: Int
    $before: String
    $sort: [MedicineSortInput!]
  ) {
    medicinesSearch(
      filter: $filter
      first: $first
      after: $after
      last: $last
      before: $before
      sort: $sort
    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...MedicineFields
        }
      }
    }
  }
  ${MEDICINE_FIELDS}
`;

export interface MedicineSearchFilter {
  searchText?: string;
  origin?: MedicineOrigin;
  status?: MedicineStatus;
  laboratoryHolders?: string;
}

export const MedicineSortField = {
  REGISTRATION_NUMBER: 'REGISTRATION_NUMBER',
  BRAND_NAME: 'BRAND_NAME',
  LABORATORY_HOLDER: 'LABORATORY_HOLDER',
  INITIAL_REGISTRATION_DATE: 'INITIAL_REGISTRATION_DATE',
} as const;
export type MedicineSortField = (typeof MedicineSortField)[keyof typeof MedicineSortField];

export const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export interface MedicineSortInput {
  field: MedicineSortField;
  direction: SortDirection;
}

export interface MedicinePaginationArgs {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface MedicineEdge {
  cursor: string;
  node: MedicineModel;
}

export interface MedicineConnection {
  totalCount: number;
  pageInfo: PageInfo;
  edges: MedicineEdge[];
}

interface SearchMedicinesResponse {
  medicinesSearch: MedicineConnection;
}

@Injectable({
  providedIn: 'root',
})
export class Medicine {
  private readonly apollo = inject(Apollo);

  getMedicinesByBrandName(brandName: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_BRAND_NAME,
      variables: { brandName },
    });
  }

  getMedicinesByCode(code: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_CODE,
      variables: { code },
    });
  }

  getMedicinesByIcd(icd: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_ICD,
      variables: { icd },
    });
  }

  getMedicinesByLaboratoryHolder(laboratoryHolder: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_LABORATORY_HOLDER,
      variables: { laboratoryHolder },
    });
  }

  getMedicineByRegistrationNumber(registrationNumber: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_REGISTRATION_NUMBER,
      variables: { registrationNumber },
    });
  }

  searchMedicines(
    filter: MedicineSearchFilter,
    pagination: MedicinePaginationArgs = {},
    sort: MedicineSortInput[] = [
      { field: MedicineSortField.REGISTRATION_NUMBER, direction: SortDirection.ASC },
    ],
  ) {
    return this.apollo.watchQuery<SearchMedicinesResponse>({
      query: SEARCH_MEDICINES,
      variables: { filter, ...pagination, sort },
    });
  }
}
