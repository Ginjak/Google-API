import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../../services/apiPlaces";
import {
  handleInputChange,
  handleAddItem,
  handleRemoveItem,
  handleSelectChange,
  handleAddStatus,
  handleDateChange,
} from "../../utils/settingsHelpers";
import LargeSpinner from "../LargeSpinner";
import SettingsInput from "./SettingsInput";
import SuggestionsList from "./SuggestionsList";
import AddedItemsList from "./AddedItemsList";
import SettingsDateInput from "./SettingsDateInput";
import SettingsSelect from "./SettingsSelect";
import SettingsDateInputBtn from "./SettingsDateInputBtn";
import ThemeMode from "../ThemeMode";
import Button from "../Button";
import { getSettings, updateSettings } from "../../services/apiSettings";

export default function SettingsForm() {
  const {
    isLoading: isPlacesLoading,
    data: places = [],
    error: placesError,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  const {
    isPending: isSettingsLoading,
    data: settings,
    error: settingsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const [settingsDetails, setSettingsDetails] = useState({});

  let websiteChecked;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (inputWebsite === false) {
      websiteChecked = "None";
    } else {
      websiteChecked = "";
    }

    const newItem = {
      name: nameAddedItems,
      industry: industryAddedItems,
      city: cityAddedItems,
      website: websiteChecked,
      last_review: dateValue,
      status: selectedValues,
      reminder: reminderDateAddedItems,
      dark_mode: isDarkMode,
    };

    setSettingsDetails(newItem);
    await updateSettings(newItem); // Make sure to await the updateSettings call
  };

  useEffect(() => {
    console.log("Updated Settings Details:", settingsDetails);
  }, [settingsDetails]);

  const inputName = "name";
  const inputIndustry = "industry";
  const inputCity = "city";
  const inputStatus = "status";
  const inputReminder = "reminder";

  useEffect(() => {
    if (settings && settings.length > 0) {
      setIndustryAddedItems(JSON.parse(settings[0].industry));
      setNameAddedItems(JSON.parse(settings[0].name));
      setCityAddedItems(JSON.parse(settings[0].city));
      setInputWebsite(settings[0].website !== "None");
      setInputWebsiteChecked(settings[0].website !== "None");
      setDateValue(settings[0].last_review);
      setSelectedValues(JSON.parse(settings[0].status));
      setIsDarkMode(JSON.parse(settings[0].dark_mode));
      setReminderDateAddedItems(JSON.parse(settings[0].reminder));
    }
  }, [settings]);

  const [inputNameValue, setInputNameValue] = useState("");
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [nameAddedItems, setNameAddedItems] = useState([]);

  const [inputIndustryValue, setInputIndustryValue] = useState("");
  const [industrySuggestions, setIndustrySuggestions] = useState([]);
  const [industryAddedItems, setIndustryAddedItems] = useState([]);

  const [inputCityValue, setInputCityValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [cityAddedItems, setCityAddedItems] = useState([]);

  const [inputWebsite, setInputWebsite] = useState(false);
  const [inputWebsiteChecked, setInputWebsiteChecked] = useState(false);

  const [dateValue, setDateValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Track the selected option
  const [selectedValues, setSelectedValues] = useState([]); // Store added values
  const options = [
    { value: "new", label: "New" },
    { value: "call_later", label: "Call Later" },
    { value: "potential", label: "Potential" },
    { value: "closed", label: "Closed" },
    { value: "archived", label: "Archived" },
  ];

  const [reminderDate, setReminderDate] = useState("");
  const [reminderDateAddedItems, setReminderDateAddedItems] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleWebsiteChange = () => {
    const newMode = !inputWebsite;
    setInputWebsite(newMode);
    setInputWebsiteChecked(newMode);
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

  useEffect(() => {
    console.log("Check", inputWebsite);
  }, [inputWebsite]);

  // Apply the dark mode class on mount based on initial state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); // Sync class whenever isDarkMode changes

  if (isPlacesLoading || isSettingsLoading) return <LargeSpinner />;
  if (placesError) return <p>Error loading places.</p>;
  if (settingsError) return <p>Error loading settings.</p>;

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* Name Input */}
        <SettingsInput
          labelName={inputName}
          type={"text"}
          value={inputNameValue}
          onChange={(event) =>
            handleInputChange(
              event,
              setInputNameValue,
              setNameSuggestions,
              places,
              nameAddedItems,
              inputName
            )
          }
          onAdd={() => {
            if (
              handleAddItem(inputNameValue, nameAddedItems, setNameAddedItems)
            ) {
              setInputNameValue("");
              setNameSuggestions([]);
            }
          }}
        />
        <SuggestionsList
          suggestions={nameSuggestions}
          onSelect={(name) => {
            setInputNameValue(name);
            setNameSuggestions([]);
          }}
          labelName={inputName}
        />
        <AddedItemsList
          items={nameAddedItems}
          onRemove={(item) =>
            handleRemoveItem(item, setNameAddedItems, nameAddedItems)
          }
          labelName={inputName}
        />
        {/* Industry Input */}
        <SettingsInput
          labelName={inputIndustry}
          type={"text"}
          value={inputIndustryValue}
          onChange={(event) =>
            handleInputChange(
              event,
              setInputIndustryValue,
              setIndustrySuggestions,
              places,
              industryAddedItems,
              inputIndustry
            )
          }
          onAdd={() => {
            if (
              handleAddItem(
                inputIndustryValue,
                industryAddedItems,
                setIndustryAddedItems
              )
            ) {
              setInputIndustryValue("");
              setIndustrySuggestions([]);
            }
          }}
        />
        <SuggestionsList
          suggestions={industrySuggestions}
          onSelect={(industry) => {
            setInputIndustryValue(industry);
            setIndustrySuggestions([]);
          }}
          labelName={inputIndustry}
        />
        <AddedItemsList
          items={industryAddedItems}
          onRemove={(item) =>
            handleRemoveItem(item, setIndustryAddedItems, industryAddedItems)
          }
          labelName={inputIndustry}
        />
        {/* City Input */}
        <SettingsInput
          labelName={inputCity}
          type={"text"}
          value={inputCityValue}
          onChange={(event) =>
            handleInputChange(
              event,
              setInputCityValue,
              setCitySuggestions,
              places,
              cityAddedItems,
              inputCity
            )
          }
          onAdd={() => {
            if (
              handleAddItem(inputCityValue, cityAddedItems, setCityAddedItems)
            ) {
              setInputCityValue("");
              setCitySuggestions([]);
            }
          }}
        />
        <SuggestionsList
          suggestions={citySuggestions}
          onSelect={(city) => {
            setInputCityValue(city);
            setCitySuggestions([]);
          }}
          labelName={inputCity}
        />
        <AddedItemsList
          items={cityAddedItems}
          onRemove={(item) =>
            handleRemoveItem(item, setCityAddedItems, cityAddedItems)
          }
          labelName={inputCity}
        />
        <SettingsInput
          labelName={"website"}
          type={"checkbox"}
          checked={inputWebsiteChecked}
          onChange={handleWebsiteChange}
        />
        {/* Date Input */}
        <SettingsDateInput
          labelName={"Last Review"}
          value={dateValue}
          onChange={(event) => handleDateChange(event, setDateValue)}
        />
        {/* Status Select */}
        <SettingsSelect
          labelName={inputStatus}
          options={options}
          onChange={(event) => handleSelectChange(event, setSelectedOption)} // Set selected option without adding it
          onAdd={() =>
            handleAddStatus(
              selectedOption,
              selectedValues,
              setSelectedOption,
              setSelectedValues
            )
          }
        />
        {/* Button to add selected status */}
        <AddedItemsList
          items={selectedValues} // Use the updated state array
          onRemove={(item) =>
            handleRemoveItem(item, setSelectedValues, selectedValues)
          }
          labelName={inputStatus}
        />
        <SettingsDateInputBtn
          labelName={inputReminder}
          value={reminderDate}
          onChange={(event) => setReminderDate(event)}
          onAdd={() =>
            handleAddStatus(
              reminderDate,
              reminderDateAddedItems,
              setReminderDate,
              setReminderDateAddedItems
            )
          }
        />
        <AddedItemsList
          items={reminderDateAddedItems}
          onRemove={(item) =>
            handleRemoveItem(
              item,
              setReminderDateAddedItems,
              reminderDateAddedItems
            )
          }
          labelName={inputReminder}
        />
        <ThemeMode checked={isDarkMode} onChange={handleToggleTheme} />

        <Button>Send</Button>
      </form>
    </>
  );
}
