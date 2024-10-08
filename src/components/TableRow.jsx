import React, { useState } from "react";

import { formatDateString } from "../utils/helpers";
import Modal from "./Modal";
import EditPlaceForm from "./EditPlaceForm";

export default function TableRow({ place, latestReviewDate }) {
  // Destructure latestReviewDate from props
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    place_id,
    name,
    industry,
    city,
    rating_avg,
    latest_review,
    website,
    notes,
    reminder_date,
    status,
  } = place;

  return (
    <>
      <div
        onClick={() => setShowForm((show) => !show)}
        className={`grid grid-cols-8 text-center border-b-2 border-slate-50 dark:border-source-greenHover hover:bg-source-darkThemeBg hover:text-source-textLight text-source-greenHover cursor-pointer transition-colors duration-200 dark:hover:bg-source-greenHover dark:text-green-100 ${
          status === "archived"
            ? "bg-slate-500 text-slate-600 dark:bg-slate-500 dark:text-slate-600 hover:text-slate-600 hover:bg-slate-500 dark:hover:bg-slate-500"
            : ""
        }`}
      >
        <p className="p-2 whitespace-nowrap truncate ...  font-medium ">
          {name}
        </p>
        <p className="p-2 whitespace-nowrap truncate ...  font-medium">
          {industry ? industry.charAt(0).toUpperCase() + industry.slice(1) : ""}
        </p>
        <p className="p-2 whitespace-nowrap truncate ...  font-medium">
          {city}
        </p>
        <p className="p-2 whitespace-nowrap truncate ...  font-medium">
          {rating_avg}
        </p>
        <p className="p-2 whitespace-nowrap truncate ...  font-medium">
          {latestReviewDate}
        </p>
        <p className="p-2 whitespace-nowrap truncate ...  font-medium">
          {website}
        </p>
        <p className="p-2 whitespace-nowrap truncate ...  font-medium">
          {notes}
        </p>
        <p className="p-2 whitespace-nowrap truncate ...  font-medium">
          {reminder_date}
        </p>
      </div>
    </>
  );
}
