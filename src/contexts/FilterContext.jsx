import React, { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const addFilter = (label, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: [...(prevFilters[label] || []), value],
    }));
  };

  const removeFilter = (label, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [label]: prevFilters[label]?.filter((item) => item !== value),
    }));
  };

  const saveFilters = (newFilters) => {
    setFilters(newFilters); // Update filters with a new object
  };

  const handleToggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("dark-mode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply the dark mode class on mount based on initial state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); // Sync class whenever isDarkMode changes

  return (
    <FilterContext.Provider
      value={{
        filters,
        addFilter,
        removeFilter,
        saveFilters,
        isDarkMode, // Expose isDarkMode
        handleToggleTheme, // Expose the toggle function
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
