import React from 'react';

import {CompanyFormData, ContactFormData} from '@/types/forms';
import {LocalEntityType} from '@/constant/entities';

import CompanyForm from './CompanyForm';
import ContactForm from './ContactForm';

export interface IEntity {
    id: string,
    name: string,
}

export interface ICompany extends IEntity {
    industry: string,
    contactEmail: string,
}

export interface IContact extends IEntity {
    email: string,
    phone: string,
}
interface EntityFormProps {
    entityType?: LocalEntityType;
    onSubmit: (data: CompanyFormData | ContactFormData, id?: string) => void;
    entity?: ICompany | IContact;
}

const EntityForm: React.FC<EntityFormProps> = ({ entityType, onSubmit, entity }) => {
  const isCompany = entityType === LocalEntityType.COMPANY;

  return isCompany ? (
    <CompanyForm
      onSubmit={(data) => onSubmit(data, entity?.id)}
      defaultValues={entity ? (entity as CompanyFormData) : undefined}
    />
  ) : (
    <ContactForm
      onSubmit={(data) => onSubmit(data, entity?.id)}
      defaultValues={entity ? (entity as ContactFormData) : undefined}
    />
  ); 
};

export default EntityForm;
