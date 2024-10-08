import React from "react";

export default function SelectInput({
  name,
  labelText,
  labelClass = "",
  selectClass = "",
  optionsFirstBlank = false,
  optionsValues = [],
  value, // Add value prop
  onChange,
  required = false,
  disabled = false,
}) {
  return (
    <label
      htmlFor={name}
      className={`flex flex-col items-start gap-0 text-sm font-medium leading-6 text-source-green ${
        labelClass ? labelClass : ""
      }`}
    >
      {labelText}

      <select
        name={name}
        id={name}
        className={`block w-full rounded-md border-0 px-3.5 py-2 text-source-green shadow-sm ring-2 ring-inset ring-source-green placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-source-green sm:text-sm ${
          selectClass ? selectClass : ""
        }`}
        value={value} // Set the value prop
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {optionsFirstBlank && <option disabled></option>}
        {optionsValues.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
