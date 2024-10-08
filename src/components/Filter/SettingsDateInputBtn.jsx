import React from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS styles

export default function SettingsDateInputBtn({
  labelName,
  value,
  onChange,
  onAdd,
}) {
  // Function to handle date change
  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = formatDate(date);
      onChange(formattedDate); // Call the provided onChange function with the formatted date string
    } else {
      console.error("Invalid date selected");
    }
  };

  // Function to format date to MM-dd-yyyy
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <label htmlFor={labelName} className="flex flex-col">
      {labelName?.charAt(0).toUpperCase() + labelName.slice(1)}
      <div className="flex items-center space-x-2">
        <DatePicker
          id={labelName}
          className="bg-green-800 p-1 rounded"
          selected={value ? new Date(value) : null} // Convert string back to Date object for DatePicker
          onChange={handleDateChange} // Function to handle date change
          dateFormat="MM-dd-yyyy" // Format of the date
          placeholderText="Select a date" // Placeholder text
        />
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-500 text-white p-1 rounded"
        >
          Add
        </button>
      </div>
    </label>
  );
}
