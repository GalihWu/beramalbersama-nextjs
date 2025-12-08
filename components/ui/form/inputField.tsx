import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
}) => (
  <div>
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        className="py-3 bg-gray-100 ps-4 pe-10 block w-full h-[8rem] border-gray-200 rounded-lg text-base focus:border-neutral-500 focus:ring-neutral-500"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        id={name}
        type={type}
        className="py-3 bg-gray-100 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-base focus:border-neutral-500 focus:ring-neutral-500"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
    <label htmlFor={name} className="text-red-700">
      {error}
    </label>
  </div>
);

export default InputField;
