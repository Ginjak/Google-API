// Get Lat and Lng
export async function getLatLng(location) {
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    location
  )}`;

  try {
    const response = await fetch(geocodeUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat, lng: lon };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

// Time stap converter, returns dd-mm-yyyy from timestamp
export function timeStampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
  return `${month}-${day}-${year}`;
}

export function formatDateString(dateString) {
  const date = new Date(dateString); // Parse the date string

  // Get the month, day, and year
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  // Return the formatted date string
  return `${month}-${day}-${year}`;
}
