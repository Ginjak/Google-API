import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AddedItemsList({ items, onRemove, labelName }) {
  return (
    items.length > 0 && (
      <ul
        className={`${labelName}-added-items-list bg-source-green text-green-100 rounded-md p-2 inline-flex flex-col gap-2 min-w-96 mb-4`}
      >
        {items.map((item, index) => (
          <li key={index} className="added-item flex gap-4 justify-between">
            {item?.charAt(0).toUpperCase() + item.slice(1)}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="delete-button"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="hover:text-source-textLight duration-300 transition-colors"
              />
            </button>
          </li>
        ))}
      </ul>
    )
  );
}
