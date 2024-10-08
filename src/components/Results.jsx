import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "./Table";
import TableRow from "./TableRow";
import EditPlace from "./EditPlace";
import LargeSpinner from "./LargeSpinner";
import { filterResults, getPlaces } from "../services/apiPlaces";
import { getSettings } from "../services/apiSettings";
import { timeStampToDate } from "../utils/helpers";

export default function Results() {
  const queryClient = useQueryClient();

  const {
    isPending: isSettingsPending,
    data: settings,
    error: settingsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const {
    isLoading: isPlacesLoading,
    data: places,
    error: placesError,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (settings) {
      console.log("Test Settings object:", settings[0]);
    }
  }, [settings]);

  useEffect(() => {
    const fetchFilteredResults = async () => {
      if (settings && places) {
        try {
          const data = await filterResults(settings[0]);
          setFilteredData(data);
        } catch (err) {
          setError(err);
        }
      }
    };

    if (!isSettingsPending && !isPlacesLoading) {
      fetchFilteredResults();
    }
  }, [settings, places, isSettingsPending, isPlacesLoading]);

  if (isSettingsPending || isPlacesLoading) return <LargeSpinner />;
  if (settingsError || placesError)
    return <p>Error: {settingsError?.message || placesError?.message}</p>;

  return (
    <div className="results relative">
      <Table />
      {filteredData &&
        filteredData.map((place) => {
          const latestReviewDate = place.latest_review
            ? timeStampToDate(Number(place.latest_review)) // Convert to number before formatting
            : "Unknown";
          return (
            <EditPlace key={place.id} place={place}>
              <TableRow place={place} latestReviewDate={latestReviewDate} />{" "}
              {/* Pass latestReviewDate */}
            </EditPlace>
          );
        })}
    </div>
  );
}
