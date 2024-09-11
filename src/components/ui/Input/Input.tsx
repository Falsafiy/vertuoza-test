import React from 'react';
import {
  UseFormRegister,
  Path,
  FieldValues,
} from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
    id: Path<T>;
    label: string;
    register: UseFormRegister<T>;
    errorMessage?: string;
    rules?: object;
    defaultValue?: string;
}
 
const InputField = <T extends FieldValues>({
  id,
  label,
  register,
  errorMessage,
  rules,
  defaultValue = '',
}: InputFieldProps<T>) => (
    <div className="mb-6 relative flex flex-col gap-2">
      <label htmlFor={id as string}>{label}</label>
      <input
        id={id as string}
        defaultValue={defaultValue}
        {...register(id, rules)}
        className={'peer w-full border-none outline-none bg-transparent placeholder-opacity-50 placeholder-blue-light text-lg text-blue-primary focus:outline-none mb-2'}
      />
      <span
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-blue-primary opacity-30 transition-all duration-300 peer-focus:h-[2px] peer-focus:opacity-100 ${
          errorMessage && 'bottom-1/3'
        }`}
      ></span>
      {errorMessage && <p className="text-red-error">{errorMessage}</p>}
    </div>
  );

export default InputField;
