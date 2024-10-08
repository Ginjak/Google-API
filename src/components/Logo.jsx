import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ linkPath, logoPath, altText, logoClass }) {
  return (
    <>
      <Link to={linkPath}>
        <img src={logoPath} alt={altText} className={logoClass} />
      </Link>
    </>
  );
}
