import React from 'react';

import { Company, Contact } from '@/types/generated';
import { EntityType } from '@/constant/entities';
import {CompanyFormData, ContactFormData} from '@/types/forms';

import CompanyForm from './CompanyForm';
import ContactForm from './ContactForm';

interface EntityFormProps {
    entityType?: EntityType;
    onSubmit: (data: CompanyFormData | ContactFormData, id?: string) => void;
    entity?: Company | Contact;
}

const EntityForm: React.FC<EntityFormProps> = ({ entityType, onSubmit, entity }) => {
  const isCompany = entityType === EntityType.COMPANY;

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
