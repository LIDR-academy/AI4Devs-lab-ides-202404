import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  error?: string;
  [x: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', error, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input type={type} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`} {...rest} />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default InputField;
