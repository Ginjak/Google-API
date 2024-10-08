import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const apiKey = process.env.VITE_GOOGLE_API;

// Enable CORS
app.use(cors());

app.get("/api/places", async (req, res) => {
  const query = req.query.query;
  const location = encodeURIComponent(req.query.location);
  const radius = req.query.radius;
  const nextPageToken = req.query.nextPageToken || "";
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location}&radius=${radius}&key=${apiKey}${
    nextPageToken ? `&pagetoken=${nextPageToken}` : ""
  }&components=country:gb`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/places/details", async (req, res) => {
  const placeId = req.query.place_id;
  if (!placeId) {
    return res.status(400).json({ error: "Place ID is required" });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
