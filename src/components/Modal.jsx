import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children, onClose }) {
  const ref = useRef();

  useEffect(() => {
    // Define the click handler
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    // Set a timeout to delay the event listener
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0); // Execute after current call stack

    // Cleanup function to remove the event listener
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal bg-white dark:bg-source-green" ref={ref}>
        <button
          onClick={onClose}
          className="absolute top-[20px] right-[64px] hover:bg-source-greenHover px-2 py-1 rounded transition duration-500 dark:text-green-100 dark:hover:bg-source-darkThemeBg hover:text-green-100 text-source-greenHover"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div>{children}</div>
      </div>
    </>
  );
}
