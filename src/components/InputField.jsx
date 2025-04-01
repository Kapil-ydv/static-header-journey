
import React from 'react';

const InputField = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  name,
}) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-3 border rounded-md ${
            icon ? 'pl-10' : ''
          } ${
            error ? 'border-error' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default InputField;
