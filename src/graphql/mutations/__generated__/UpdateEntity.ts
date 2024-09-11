/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEntityInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEntity
// ====================================================

export interface UpdateEntity_updateEntity_Contact {
  __typename: "Contact";
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface UpdateEntity_updateEntity_Company {
  __typename: "Company";
  id: string;
  name: string;
  industry: string;
  contactEmail: string | null;
}

export type UpdateEntity_updateEntity = UpdateEntity_updateEntity_Contact | UpdateEntity_updateEntity_Company;

export interface UpdateEntity {
  updateEntity: UpdateEntity_updateEntity | null;
}

export interface UpdateEntityVariables {
  input: UpdateEntityInput;
}
