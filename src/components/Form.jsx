import { useState } from "react";
import { fetchResults } from "../utils/apiHelpers";
import { useResults } from "../contexts/ResultsContext";
import {
  sendPlacesToDatabase,
  filterUniquePlaceIds,
} from "../services/apiPlaces";
import usePlaces from "../services/usePlaces";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Button from "./Button";
import SmallSpinner from "./SmallSpinner";

export default function Form({ onClose }) {
  const { places } = usePlaces();

  const [formData, setFormData] = useState({
    industry: "",
    location: "",
    radius: "5000",
  });

  const { results, setResults } = useResults();
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchDisabled, isSearchDisabled] = useState(false);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResults([]);
    setNextPageToken(null);
    setIsLoading(true);
    isSearchDisabled(true);
    try {
      await fetchResults(formData, setResults, setNextPageToken);
    } catch (error) {
      console.error("Error fetching results:", error); // Handle error if needed
    } finally {
      setIsLoading(false);
      console.log(formData);
    }
  };

  const handleLoadMore = async (e) => {
    e.preventDefault();
    if (nextPageToken) {
      setIsLoading(true);
      try {
        await fetchResults(
          { ...formData, nextPageToken },
          setResults,
          setNextPageToken
        );
        console.log("Loaded more results:", results);
      } catch (error) {
        console.error("Error loading more data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddToDatabase = async () => {
    if (places.length > 0 && results.length > 0) {
      try {
        setIsLoading(true);
        const uniqueIds = filterUniquePlaceIds(places, results);
        await sendPlacesToDatabase(uniqueIds);
        setResults([]);
        onClose(); // Close the modal after adding to the database
      } catch (error) {
        console.error("Error in handleAddToDatabase:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const reset = () => {
    setFormData({
      industry: "",
      location: "",
      radius: "5000",
    });
    setResults([]);
  };

  return (
    <div className="search">
      {/* <button
        className="bg-red-500 text-white p-4"
        onClick={() => handleAddToDatabase()}
      >
        Test
      </button> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 min-w-80">
            <Input
              labelVisible={false}
              name="industry"
              inputPlaceholder="Industry"
              inputValue={formData.industry}
              onChange={handleChange}
              required={true}
              disabled={searchDisabled}
              inputClass={
                "dark:bg-source-darkThemeBg dark:placeholder:text-green-100 dark:text-green-100"
              }
            />
            <Input
              labelVisible={false}
              name="location"
              inputPlaceholder="Location"
              inputValue={formData.location}
              onChange={handleChange}
              required={true}
              disabled={searchDisabled}
              inputClass={
                "dark:bg-source-darkThemeBg dark:placeholder:text-green-100 dark:text-green-100"
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <SelectInput
              labelClass={"dark:text-green-100"}
              selectClass={
                "dark:bg-source-darkThemeBg placeholder:text-green-100 dark:text-green-100"
              }
              name="radius"
              labelText="Radius"
              optionsFirstBlank={false}
              optionsValues={[
                { value: "1000", label: "One km" },
                { value: "5000", label: "Five km" },
                { value: "10000", label: "Ten km" },
              ]}
              value={formData.radius} // Pass the current value
              onChange={handleChange}
              disabled={searchDisabled}
            />
          </div>
        </div>
        {isLoading && <SmallSpinner>Loading...</SmallSpinner>}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              onClick={() => {
                onClose?.();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button buttonType="submit" visible={searchDisabled}>
              Search
            </Button>
            {nextPageToken && (
              <Button onClick={handleLoadMore} disabled={isLoading}>
                Load more
              </Button>
            )}
          </div>
          <div className="flex justify-between">
            {results.length > 0 && !isLoading && (
              <Button onClick={() => handleAddToDatabase()}>
                Add to database
              </Button>
            )}
            {results.length > 0 && !isLoading && (
              <p className="flex flex-col items-center leading-tight justify-center font-medium text-source-greenHover dark:text-green-100">
                Results<span>{results.length}</span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
