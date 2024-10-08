import React from "react";

export default function AddedItemsList({ items, onRemove, labelName }) {
  return (
    items.length > 0 && (
      <ul className={`${labelName}-added-items-list`}>
        {items.map((item, index) => (
          <li key={index} className="added-item">
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
  );
}
