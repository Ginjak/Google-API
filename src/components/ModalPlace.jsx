import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

export default function ModalPlace({ children, onClose }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <div className="modal-wraper">
      <div className="modal-overlay" onClick={handleClose}></div>
      <div
        className="modal bg-white dark:bg-source-green min-w-[600px] custom-sm-600:min-w-full"
        onClick={stopPropagation}
      >
        <button
          onClick={handleClose}
          className="absolute top-[20px] right-[64px] hover:bg-source-greenHover px-2 py-1 rounded transition duration-500 dark:text-green-100 dark:hover:bg-source-darkThemeBg hover:text-green-100 text-source-greenHover"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
