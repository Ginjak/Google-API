import { getLatLng } from "./helpers";

export async function fetchResults(formData, setResults, setNextPageToken) {
  const { lat, lng } = await getLatLng(formData.location);
  if (!lat || !lng) {
    console.error("Failed to get latitude and longitude");
    return;
  }

  const url = new URL("http://localhost:3001/api/places");
  url.searchParams.append("query", formData.industry);
  url.searchParams.append("location", `${lat},${lng}`);
  url.searchParams.append("radius", formData.radius);
  if (formData.nextPageToken) {
    url.searchParams.append("nextPageToken", formData.nextPageToken);
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Filter places with a rating of 4 or more
    const filteredPlaces = data.results.filter((place) => place.rating >= 4);

    // Extract place_id list from the filtered results
    const placeIds = filteredPlaces.map((place) => place.place_id);

    // Log the place_ids
    console.log("Fetched place_ids:", placeIds);

    // Update the state with the place_id list
    setResults((prevResults) => [...prevResults, ...placeIds]);

    if (data.next_page_token) {
      // Wait for the token to be active
      await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5 seconds delay
      setNextPageToken(data.next_page_token); // Set next page token
    } else {
      setNextPageToken(null); // Clear next page token if no more pages
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function fetchPlaceDetails(placeIds) {
  // Ensure placeIds is an array
  if (!Array.isArray(placeIds)) {
    throw new Error("placeIds should be an array");
  }

  // Create an array of fetch promises
  const fetchPromises = placeIds.map((placeId) => {
    const url = `http://localhost:3001/api/places/details?place_id=${placeId}`;
    console.log(`Fetching details for place_id: ${placeId}`); // Add this line
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        return data.result;
      })
      .catch((error) => {
        console.error(
          `There was a problem fetching details for ${placeId}:`,
          error
        ); // Add this line
        return null;
      });
  });

  // Wait for all fetch promises to resolve
  try {
    const results = await Promise.all(fetchPromises);
    console.log("Fetched place details results:", results); // Add this line
    return results;
  } catch (error) {
    console.error("There was a problem with the fetch operations:", error);
    return [];
  }
}
