import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Medicine as MedicineModel, MedicineOrigin, MedicineStatus } from '../../model/medicine';

const GET_MEDICINES_BY_BRAND_NAME = gql`
  query GetMedicinesByBrandName($brandName: String!) {
    medicinesByBrandName(brandName: $brandName) {
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
  }
`;

const GET_MEDICINES_BY_CODE = gql`
  query GetMedicinesByCode($code: String!) {
    medicinesByCode(code: $code) {
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
  }
`;
const GET_MEDICINES_BY_ICD = gql`
  query GetMedicinesByIcd($icd: String!) {
    medicinesByIcd(icd: $icd) {
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
  }
`;
const GET_MEDICINES_BY_LABORATORY_HOLDER = gql`
  query GetMedicinesByLaboratoryHolder($laboratoryHolder: String!) {
    medicinesByLaboratoryHolder(laboratoryHolder: $laboratoryHolder) {
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
  }
`;
const GET_MEDICINES_BY_REGISTRATION_NUMBER = gql`
  query GetMedicineByRegistrationNumber($registrationNumber: String!) {
    medicineByRegistrationNumber(registrationNumber: $registrationNumber) {
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
  }
`;
const SEARCH_MEDICINES = gql`
  query SearchMedicines($filter: MedicineSearchFilter!) {
    medicinesSearch(filter: $filter) {
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
  }
`;

export interface MedicineSearchFilter {
  searchText?: string;
  origin?: MedicineOrigin;
  status?: MedicineStatus;
  laboratoryHolders?: string;
}

interface SearchMedicinesResponse {
  medicinesSearch: MedicineModel[];
}

@Injectable({
  providedIn: 'root',
})
export class Medicine {
  private readonly apollo = inject(Apollo);

  // function to call medicineByBrandName api
  getMedicinesByBrandName(brandName: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_BRAND_NAME,
      variables: {
        brandName,
      },
    });
  }

  // function to call medicineByCode api
  getMedicinesByCode(code: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_CODE,
      variables: {
        code,
      },
    });
  }

  // function to call medicineByIcd api
  getMedicinesByIcd(icd: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_ICD,
      variables: {
        icd,
      },
    });
  }

  // function to call medicinesByLaboratoryHolder api
  getMedicinesByLaboratoryHolder(laboratoryHolder: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_LABORATORY_HOLDER,
      variables: {
        laboratoryHolder,
      },
    });
  }

  // function to call medicineByRegistrationNumber api
  getMedicineByRegistrationNumber(registrationNumber: string) {
    return this.apollo.watchQuery({
      query: GET_MEDICINES_BY_REGISTRATION_NUMBER,
      variables: {
        registrationNumber,
      },
    });
  }

  // function to call medicinesSearch api with multiple parameters
  // searchText, origin, status, laboratoryHolder
  searchMedicines(filter: MedicineSearchFilter) {
    return this.apollo.watchQuery<SearchMedicinesResponse>({
      query: SEARCH_MEDICINES,
      variables: {
        filter,
      },
    });
  }
}
