/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEntityInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEntity
// ====================================================

export interface CreateEntity_createEntity_Contact {
  __typename: "Contact";
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface CreateEntity_createEntity_Company {
  __typename: "Company";
  id: string;
  name: string;
  industry: string;
  contactEmail: string | null;
}

export type CreateEntity_createEntity = CreateEntity_createEntity_Contact | CreateEntity_createEntity_Company;

export interface CreateEntity {
  createEntity: CreateEntity_createEntity | null;
}

export interface CreateEntityVariables {
  input: CreateEntityInput;
}
