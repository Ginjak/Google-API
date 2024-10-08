import React from "react";

export default function Button({
  buttonClass = "",
  buttonType,
  children,
  onClick,
  disabled,
  visible,
}) {
  return (
    <button
      className={`rounded-lg bg-source-green py-2 px-4 text-green-100 hover:bg-source-greenHover hover:text-white transition-colors duration-300 dark:bg-source-darkThemeBg  ${buttonClass} 
      ${
        disabled
          ? "cursor-not-allowed bg-source-greenHover text-zinc-500 hover:text-zinc-500"
          : "notdisabled"
      } ${visible ? "hidden" : "inline"}`}
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
