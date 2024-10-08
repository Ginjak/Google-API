import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Input({
  name,
  labelText,
  labelClass = "",
  inputType = "text",
  inputPlaceholder = "",
  inputClass = "",
  inputValue = "", // Ensure default value is an empty string
  onChange,
  required = false,
  disabled = false,
  checkboxValue,
  checkboxChecked = false, // Ensure default value is false
  checkboxShowStars = false,
  checkboxStarsValue = "",
  children,
}) {
  const numberOfStars = checkboxShowStars
    ? parseInt(checkboxStarsValue, 10)
    : 0;

  return (
    <label htmlFor={name} className={labelClass}>
      {labelText}

      {inputType === "text" && (
        <input
          type={inputType}
          name={name}
          id={name}
          placeholder={inputPlaceholder}
          value={inputValue} // Always provide value prop
          className={`block w-full rounded-md border-0 px-3.5 py-2 text-source-green shadow-sm ring-2 ring-inset ring-source-green placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-source-green sm:text-sm ${
            inputClass ? inputClass : "null"
          }`}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      )}

      {inputType === "radio" && (
        <>
          <input
            type={inputType}
            name={name}
            id={name}
            className={inputClass}
            value={checkboxValue}
            onChange={onChange}
            checked={checkboxChecked} // Always provide checked prop
          />
          {checkboxShowStars && (
            <>
              {[...Array(numberOfStars)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-source-green"
                />
              ))}
            </>
          )}
          {children}
        </>
      )}
    </label>
  );
}
