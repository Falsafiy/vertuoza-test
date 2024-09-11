/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EntityType {
  COMPANY = "COMPANY",
  CONTACT = "CONTACT",
}

export interface CreateEntityInput {
  entityType: EntityType;
  name: string;
  email?: string | null;
  phone?: string | null;
  industry?: string | null;
  contactEmail?: string | null;
}

export interface UpdateEntityInput {
  id: string;
  entityType: EntityType;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  industry?: string | null;
  contactEmail?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
