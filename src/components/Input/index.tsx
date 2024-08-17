import React from 'react';

interface Input {
  onChange: (value: string) => void;
  value: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<Input> = ({ onChange, value, type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  );
};

export default Input;
