/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEntities
// ====================================================

export interface GetEntities_getEntities_Contact {
  __typename: "Contact";
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface GetEntities_getEntities_Company {
  __typename: "Company";
  id: string;
  name: string;
  industry: string;
  contactEmail: string | null;
}

export type GetEntities_getEntities = GetEntities_getEntities_Contact | GetEntities_getEntities_Company;

export interface GetEntities {
  getEntities: (GetEntities_getEntities | null)[] | null;
}
