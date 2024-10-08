import React from "react";
import Form from "./Form";
import Logo from "./Logo";
import Button from "./Button";

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  document.body.classList.toggle("bg-source-darkThemeBg");
}

export default function Header() {
  return (
    <div>
      <Button
        buttonClass="rounded-lg bg-source-green py-2 px-4 text-green-100 hover:bg-source-greenHover hover:text-white transition-colors"
        onClick={toggleDarkMode}
      >
        Test
      </Button>
      <p>Header</p>
    </div>
  );
}
