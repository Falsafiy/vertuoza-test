import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from '@/components/ui/Input/Input';
import {ContactFormData} from '@/types/forms';

interface ContactFormProps {
    onSubmit: SubmitHandler<ContactFormData>;
    defaultValues?: ContactFormData;
}
 
const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField<ContactFormData>
        id="name"
        label="Contact Name"
        register={register}
        errorMessage={errors.name?.message}
        rules={{ required: 'Contact name is required' }}
      />

      <InputField<ContactFormData>
        id="email"
        label="Email"
        register={register}
        errorMessage={errors.email?.message}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
      />

      <InputField<ContactFormData>
        id="phone"
        label="Phone"
        register={register}
        errorMessage={errors.phone?.message}
        rules={{ required: 'Phone is required' }}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
