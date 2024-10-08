import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { updateSinglePlace } from "../services/apiPlaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndustry,
  faCity,
  faStar,
  faComments,
  faEarthAmericas,
  faPhoneFlip,
  faCommentDots,
  faBusinessTime,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { timeStampToDate } from "../utils/helpers";
import toast from "react-hot-toast";
import Button from "./Button";

export default function EditPlaceForm({ placeUpdate = {}, onCloseModal }) {
  const { place_id: updateId, latest_review, ...updateValues } = placeUpdate;

  // Store the original latest_review timestamp
  const originalLatestReview = latest_review;

  // Convert latest_review timestamp to date format
  const formattedLatestReview = timeStampToDate(latest_review);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      ...updateValues,
      latest_review: formattedLatestReview, // Set the formatted date here
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newPlaceData, place_id }) =>
      updateSinglePlace(newPlaceData, place_id),
    onSuccess: () => {
      toast.success("Place updated!");
      queryClient.invalidateQueries(["places"]);
      onCloseModal?.();
    },
    onError: (err) => toast.error(err.message),
  });

  const reminderDate = watch("reminder_date");

  // Function to format date to MM-dd-yyyy
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      // Add one hour to the selected date
      const adjustedDate = new Date(date.getTime() + 60 * 60 * 1000); // Add 1 hour in milliseconds
      const formattedDate = formatDate(adjustedDate);
      setValue("reminder_date", formattedDate); // Set the formatted date to the form
    } else {
      console.error("Invalid date selected");
    }
  };

  function onSubmit(data) {
    // Replace the formatted latest_review with the original timestamp
    data.latest_review = originalLatestReview;

    // Check if reminder_date is provided
    if (!data.reminder_date) {
      toast.error("Please provide a reminder date.");
      return;
    }

    // Proceed to mutate the data
    mutate({ newPlaceData: data, place_id: updateId });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 text-source-greenHover dark:text-green-100"
    >
      <label htmlFor="name">
        <input
          readOnly
          type="text"
          id="name"
          className="bg-transparent w-full focus:outline-none font-semibold"
          {...register("name")}
        />
      </label>
      <label htmlFor="industry" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faIndustry} />
        <input
          readOnly
          type="text"
          id="industry"
          className="bg-transparent focus:outline-none"
          {...register("industry")}
        />
      </label>
      <label htmlFor="city" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faCity} />
        <input
          readOnly
          type="text"
          id="city"
          className="bg-transparent focus:outline-none"
          {...register("city")}
        />
      </label>
      <label htmlFor="rating_avg" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faStar} />
        <input
          readOnly
          type="text"
          id="rating_avg"
          className="bg-transparent focus:outline-none"
          {...register("rating_avg")}
        />
      </label>
      <label htmlFor="latest_review" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faComments} />
        <div>
          <span>Last review </span>
          <input
            readOnly
            type="text"
            id="latest_review"
            className="bg-transparent focus:outline-none"
            {...register("latest_review")}
          />
        </div>
      </label>
      <label htmlFor="website" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faEarthAmericas} />
        <input
          type="text"
          id="website"
          className="bg-transparent w-full focus:outline-none cursor-pointer"
          readOnly
          {...register("website")}
        />
      </label>
      <label htmlFor="phone" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faPhoneFlip} />
        <input
          type="text"
          id="phone"
          className="bg-transparent focus:outline-none"
          {...register("phone")}
        />
      </label>
      <div className="h-px bg-green-100"></div>
      <label htmlFor="status" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faFolderOpen} />
        <select
          id="status"
          className="bg-transparent w-full focus:outline-none border-2 rounded border-source-greenHover dark:border-green-100 dark:bg-source-green py-1 px-2"
          {...register("status")}
        >
          <option value="new">New</option>
          <option value="call-later">Call later</option>
          <option value="potential">Potential</option>
          <option value="closed">Closed</option>
          <option value="archived">Archived</option>
        </select>
      </label>
      <label htmlFor="notes" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faCommentDots} />
        <textarea
          type="text"
          id="notes"
          className="bg-transparent w-full focus:outline-none border-2 rounded border-source-greenHover dark:border-green-100 py-1 px-2"
          {...register("notes")}
        />
      </label>
      <label htmlFor="reminder_date" className="flex items-center gap-5">
        <FontAwesomeIcon icon={faBusinessTime} />
        <DatePicker
          id={"reminder_date"}
          className="bg-transparent w-full focus:outline-none border-2 rounded border-source-greenHover dark:border-green-100 py-1 px-2"
          selected={reminderDate ? new Date(reminderDate) : null} // Convert string back to Date object for DatePicker
          onChange={handleDateChange} // Update form state on date change
          dateFormat="MM-dd-yyyy" // Date format
          placeholderText="Select a date" // Placeholder text
        />
      </label>
      <div className="flex gap-3">
        <Button disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update"}
        </Button>
        <Button buttonType={"reset"} onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
