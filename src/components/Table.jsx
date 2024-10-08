import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";

export default function Table() {
  return (
    <>
      <div role="table" className="grid grid-cols-8 gap-0 text-center">
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faUserTie} />
        </div>
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faIndustry} />
        </div>
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faCity} />
        </div>
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faComments} />
        </div>
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faEarthAmericas} />
        </div>
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
        <div className="px-2 py-3 bg-source-green text-gray-100 hover:bg-source-greenHover transition-all cursor-pointer">
          <FontAwesomeIcon icon={faBusinessTime} />
        </div>
      </div>
    </>
  );
}
