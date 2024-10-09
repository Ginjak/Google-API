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
    <div className="flex gap-3 items-center">
      <label
        htmlFor={labelName}
        className="flex min-w-32 uppercase font-semibold tracking-wider text-source-greenHover dark:text-green-100 "
      >
        {labelName?.charAt(0).toUpperCase() + labelName.slice(1)}
      </label>
      <div className="flex">
        <DatePicker
          id={labelName}
          className="block h-10 rounded-[6px_0_0_6px] border-0 px-3.5 py-2 text-source-green ring-2 ring-inset ring-source-green placeholder:text-gray-500 focus:ring-inset focus:ring-source-green sm:text-sm focus:outline-none focus:bg-green-50 dark:ring-green-100 dark:focus:ring-green-100 min-w-[180px]"
          selected={value ? new Date(value) : null} // Convert string back to Date object for DatePicker
          onChange={handleDateChange} // Function to handle date change
          dateFormat="MM-dd-yyyy" // Format of the date
          placeholderText="Select a date" // Placeholder text
        />
        <button
          type="button"
          onClick={onAdd}
          className="h-10 bg-source-green rounded-[0_6px_6px_0] p-2 text-green-100 hover:bg-source-greenHover hover:text-white transition-colors duration-300 uppercase font-medium dark:bg-green-100 dark:text-source-greenHover"
        >
          Add
        </button>
      </div>
    </div>
  );
}
