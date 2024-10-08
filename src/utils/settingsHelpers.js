export const handleInputChange = (
  event,
  setInput,
  setSuggestions,
  places,
  addedItems,
  listKey
) => {
  const value = event.target.value;
  setInput(value);

  if (value) {
    const filteredSuggestions = places
      .filter((suggestion) => {
        const keyValue = suggestion[listKey]?.toLowerCase(); // Optional chaining for safety

        return (
          keyValue?.includes(value.toLowerCase()) && // Safely check if keyValue is defined
          !addedItems.includes(keyValue)
        );
      })
      .slice(0, 4); // Get only the first 4 suggestions

    setSuggestions(filteredSuggestions);
  } else {
    setSuggestions([]); // Clear suggestions if input is empty
  }
};

export const handleAddItem = (value, addedItems, setAddedItems) => {
  if (value && !addedItems.includes(value)) {
    setAddedItems([...addedItems, value]); // Add the item if it's not already in the list
    return true; // Return true to indicate a successful addition
  }
  return false;
};

export const handleAddStatus = (options, values, setOption, setValues) => {
  if (options && !values.includes(options)) {
    setValues((prev) => [...prev, options]);
    setOption("");
  }
};

export const handleDateChange = (event, setDateValue) => {
  setDateValue(event);
};
// export const handleDateChangeReminder = (event, setDateValue) => {
//   // Assuming event is a Date object. If it's not, parse it to a Date object first
//   const formattedDate =
//     event instanceof Date
//       ? event.toLocaleDateString()
//       : new Date(event).toLocaleDateString();

//   // Set the formatted date value
//   setDateValue(formattedDate);
// };
export const handleDateChangeReminder = (event, setDateValue) => {
  // Assuming event is a Date object. If it's not, parse it to a Date object first
  const formattedDate =
    event instanceof Date
      ? event.toLocaleDateString()
      : new Date(event).toLocaleDateString();

  // Set the formatted date value
  setDateValue(formattedDate);
};

export const handleRemoveItem = (itemToRemove, setAddedItems, addedItems) => {
  setAddedItems(addedItems.filter((item) => item !== itemToRemove)); // Remove the item from the list
};

export const handleSelectChange = (event, setOption) => {
  setOption(event.target.value);
};
