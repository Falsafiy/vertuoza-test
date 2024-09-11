import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from '@/components/ui/Input/Input';
import {Button} from '@/components/ui/button';
import {CompanyFormData} from '@/types/forms';

interface CompanyFormProps {
    onSubmit: SubmitHandler<CompanyFormData>;
    defaultValues?: CompanyFormData;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField<CompanyFormData>
        id="name"
        label="Company Name"
        register={register}
        errorMessage={errors.name?.message}
        rules={{ required: 'Company name is required' }}
      />

      <InputField<CompanyFormData>
        id="industry"
        label="Industry"
        register={register}
        errorMessage={errors.industry?.message}
        rules={{ required: 'Industry is required' }}
      />

      <InputField<CompanyFormData>
        id="contactEmail"
        label="Contact Email"
        register={register}
        errorMessage={errors.contactEmail?.message}
        rules={{
          required: 'Contact Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
      />
      <div className={'w-full flex justify-end'}>
        <Button type="submit" >Submit</Button>
      </div>

    </form>
  );
};

export default CompanyForm;
