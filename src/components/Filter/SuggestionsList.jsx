import React from "react";

export default function SuggestionsList({ suggestions, onSelect, labelName }) {
  // Create a Set to filter out duplicate suggestions
  const uniqueSuggestions = Array.from(
    new Set(suggestions.map((suggestion) => suggestion[labelName]))
  ).map((value) => {
    return suggestions.find((suggestion) => suggestion[labelName] === value);
  });

  return (
    uniqueSuggestions.length > 0 && (
      <ul className={`${labelName}-suggestions-list`}>
        {uniqueSuggestions.map((suggestion) => (
          <li
            key={suggestion.id} // Assuming suggestion has a unique id
            className="suggestion-item"
            onClick={() => onSelect(suggestion[labelName])} // Call onSelect with the selected suggestion
          >
            {suggestion[labelName]} {/* Display the suggestion name */}
          </li>
        ))}
      </ul>
    )
  );
}
