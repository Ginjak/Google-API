import React, { useState } from "react";
import { createPlace } from "../services/apiPlaces";

const AddPlaceForm = () => {
  const [placeDetails, setPlaceDetails] = useState({
    name: "",
    industry: "",
    city: "",
    rating_avg: "",
    latest_review: "",
    website: "",
    phone: "",
    status: "New",
    notes: "",
    reminder_date: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlaceDetails({
      ...placeDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = await createPlace(placeDetails);
      setSuccess("Place created successfully!");
      setPlaceDetails({
        name: "",
        industry: "",
        city: "",
        rating_avg: "",
        latest_review: "",
        website: "",
        phone: "",
        status: "New",
        notes: "",
        reminder_date: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Add New Place</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={placeDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={placeDetails.industry}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={placeDetails.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating_avg">Rating Avg:</label>
          <input
            type="number"
            step="0.1"
            id="rating_avg"
            name="rating_avg"
            value={placeDetails.rating_avg}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="latest_review">Latest Review (YYYY-MM-DD):</label>
          <input
            type="date"
            id="latest_review"
            name="latest_review"
            value={placeDetails.latest_review}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={placeDetails.website}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={placeDetails.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={placeDetails.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={placeDetails.notes}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="reminder_date">Reminder Date (YYYY-MM-DD):</label>
          <input
            type="date"
            id="reminder_date"
            name="reminder_date"
            value={placeDetails.reminder_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Place</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddPlaceForm;
