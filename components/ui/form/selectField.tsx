import React, { ChangeEvent } from 'react';

interface SelectFieldProps {
  label?: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  error?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
}) => (
  <div>
    <label className="form-label" htmlFor={name}>
      {label}
    </label>
    <select
      id={name}
      className="py-3 px-4 bg-gray-100 block w-full border-gray-200 rounded-lg text-base focus:border-neutral-500 focus:ring-neutral-500"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Pilih {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <label htmlFor={name} className="text-red-700">
      {error}
    </label>
  </div>
);

export default SelectField;
