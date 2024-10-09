import React from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS styles

export default function SettingsDateInput({ labelName, value, onChange }) {
  return (
    <div className="flex gap-3 items-center py-2">
      <label
        htmlFor={labelName}
        className="min-w-32 uppercase font-semibold tracking-wider text-source-greenHover dark:text-green-100 "
      >
        {labelName.charAt(0).toUpperCase() + labelName.slice(1)}
      </label>

      <DatePicker
        id={labelName}
        className="min-w-[180px] block w-full rounded-md border-0 px-3.5 py-2 text-source-green  ring-2 ring-inset ring-source-green placeholder:text-gray-500 focus:ring-inset focus:ring-source-green sm:text-sm focus:outline-none focus:bg-green-50 dark:ring-green-100 dark:focus:ring-green-100"
        selected={value} // Controlled component value (must be a Date object)
        onChange={onChange} // Function to handle date change
        dateFormat="MM-dd-yyyy" // Format of the date
        placeholderText="Select a date" // Placeholder text
      />
    </div>
  );
}
