import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_API;

export const fetchPlaces = async (query, location, radius = "10000") => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

  try {
    const response = await axios.get(url, {
      params: {
        query,
        location,
        radius,
        key: apiKey,
      },
    });

    const places = response.data.results;
    return places;
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error);
    throw error;
  }
};
