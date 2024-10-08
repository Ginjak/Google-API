import React from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS styles

export default function SettingsDateInput({ labelName, value, onChange }) {
  return (
    <label htmlFor={labelName} className="flex">
      {labelName.charAt(0).toUpperCase() + labelName.slice(1)}
      <div>
        <DatePicker
          id={labelName}
          className="bg-green-800"
          selected={value} // Controlled component value (must be a Date object)
          onChange={onChange} // Function to handle date change
          dateFormat="MM-dd-yyyy" // Format of the date
          placeholderText="Select a date" // Placeholder text
        />
      </div>
    </label>
  );
}
