import supabase from "./supabase";
import toast from "react-hot-toast";
import { fetchPlaceDetails } from "../utils/apiHelpers";

export async function getPlaces() {
  try {
    let { data, error } = await supabase.from("places").select("*");
    if (error) throw error;
    console.log("Places data:", data);
    return data;
  } catch (error) {
    console.error("Error loading places:", error.message);
    throw new Error("Places could not be loaded");
  }
}

export const updateSinglePlace = async (newPlaceData, place_id) => {
  try {
    const { data, error } = await supabase
      .from("places")
      .update(newPlaceData)
      .eq("place_id", place_id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating single place:", error);
    throw error;
  }
};

export async function createPlace(newPlaces) {
  try {
    if (!Array.isArray(newPlaces)) {
      throw new Error("newPlaces should be an array of place objects");
    }

    const { data, error } = await supabase
      .from("places")
      .insert(newPlaces)
      .select();

    if (error) throw error;

    toast.success("Places created successfully!");
    return data;
  } catch (error) {
    console.error("Error creating places:", error.message);
    toast.error("Failed to create places. Please try again.");
    throw new Error("Places could not be created");
  }
}

// Fetch google individual places and send data to database

export async function sendPlacesToDatabase(placesIdArr) {
  try {
    // Fetch details for all place IDs
    const details = await fetchPlaceDetails(placesIdArr);
    let databaseArray = [];

    details.forEach((place) => {
      const postalTown = place.address_components
        .filter((component) => component.types.includes("postal_town"))
        .map((component) => component.long_name)
        .join(", "); // Join to handle multiple postal towns

      // const latestReview =
      //   place.reviews && place.reviews.length > 0
      //     ? new Date(
      //         Math.max(...place.reviews.map((review) => review.time)) * 1000
      //       ).toLocaleDateString("en-GB")
      //     : "Unknown";
      const latestReview =
        place.reviews && place.reviews.length > 0
          ? place.reviews.reduce(
              (max, review) => (review.time > max ? review.time : max),
              place.reviews[0].time
            )
          : "Unknown";

      const newPlace = {
        place_id: place.place_id, // Updated to use place.place_id
        name: place.name,
        industry: place.types ? place.types[0] : "Unknown",
        city: postalTown || "Unknown",
        rating_avg: place.rating ? place.rating : "Unknown",
        latest_review: latestReview,
        website: place.website ? place.website : "None",
        phone: place.formatted_phone_number
          ? place.formatted_phone_number
          : "Unknown",
        status: "new",
        notes: null,
        reminder_date: null,
      };

      databaseArray.push(newPlace);
    });
    if (databaseArray.length === 0) {
      toast.error("No places to add.");
      return;
    }
    // Call sendToDatabase with the fully populated array
    await sendToDatabase(databaseArray);
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
}

export async function sendToDatabase(databaseArray) {
  if (databaseArray.length === 0) {
    throw new Error("Database array is empty.");
  }

  try {
    // Assume createPlace accepts an array of places
    await createPlace(databaseArray);
  } catch (error) {
    console.error("Error creating places:", error.message);
  }
}

export function filterUniquePlaceIds(placesSupabase, fetchedPlaces) {
  const supabasePlaceIdSet = new Set(
    placesSupabase.map((place) => place.place_id)
  );
  return fetchedPlaces.filter((placeId) => !supabasePlaceIdSet.has(placeId));
}

export async function filterResults(object) {
  const filterCriteria = object;

  try {
    const names = filterCriteria.name ? JSON.parse(filterCriteria.name) : [];
    const industries = filterCriteria.industry
      ? JSON.parse(filterCriteria.industry)
      : [];
    const cities = filterCriteria.city ? JSON.parse(filterCriteria.city) : [];
    const website = filterCriteria.website;
    const reminders = filterCriteria.reminder
      ? JSON.parse(filterCriteria.reminder)
      : [];
    const statuses = filterCriteria.status
      ? JSON.parse(filterCriteria.status)
      : [];
    const latestReview = Math.floor(
      new Date(filterCriteria.last_review).getTime() / 1000
    );

    let query = supabase.from("places").select("*");

    if (names.length > 0) {
      query = query.in("name", names);
    }

    if (website === "None") {
      query = query.eq("website", "None");
    } else {
      query = query.neq("website", "None");
    }

    if (cities.length > 0) {
      query = query.in("city", cities);
    }

    if (industries.length > 0) {
      query = query.in("industry", industries);
    }
    if (statuses.length > 0) {
      query = query.in("status", statuses);
    }
    if (reminders.length > 0) {
      // Constructing an OR query for each reminder date
      const orConditions = reminders
        .map((reminder) => {
          return `reminder_date.eq.${reminder}`;
        })
        .join(",");

      query = query.or(orConditions);
    }
    if (latestReview != "") {
      query = query.gte("latest_review", latestReview);
    }

    // Optionally apply other filters if necessary
    // Example for last_review, name, reminder, and status
    // query = query.gte("latest_review", filterCriteria.last_review);
    // query = query.in("name", names);
    // query = query.in("reminder_date", reminders);
    // query = query.in("status", statuses);

    let { data: settings, error } = await query;

    if (error) {
      throw error;
    }

    console.log("Filtered settings data:", settings);
    return settings;
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    return null;
  }
}
