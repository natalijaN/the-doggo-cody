import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  required,
  placeholder,
  rows,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={label}
          name={label}
          rows={rows}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      ) : (
        <input
          type={type}
          id={label}
          name={label}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      )}
    </div>
  );
};

export default Input;
