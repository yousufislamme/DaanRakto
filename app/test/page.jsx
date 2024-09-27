"use client";
import { useEffect, useRef } from "react";
import "./test.css";

const Test = () => {
  const pathRef1 = useRef(null);
  const pathRef2 = useRef(null);
  const pathRef3 = useRef(null);

  useEffect(() => {
    const path1 = pathRef1.current;
    const path2 = pathRef2.current;
    const path3 = pathRef3.current;

    if (path1 && path2 && path3) {
      // Get the total length of each path
      const length1 = path1.getTotalLength();
      const length2 = path2.getTotalLength();
      const length3 = path3.getTotalLength();

      // Set the stroke-dasharray and stroke-dashoffset for the animation
      path1.style.strokeDasharray = length1;
      path1.style.strokeDashoffset = length1;

      path2.style.strokeDasharray = length2;
      path2.style.strokeDashoffset = length2;

      path3.style.strokeDasharray = length3;
      path3.style.strokeDashoffset = length3;

      // Optional: Add an animation effect
      path1.style.transition = "stroke-dashoffset 2s ease-in-out";
      path2.style.transition = "stroke-dashoffset 2s ease-in-out";
      path3.style.transition = "stroke-dashoffset 2s ease-in-out";

      setTimeout(() => {
        path1.style.strokeDashoffset = "0";
        path2.style.strokeDashoffset = "0";
        path3.style.strokeDashoffset = "0";
      }, 200);
    }
  }, []);

  return (
    <div className="container px-10 py-10">
      <h2 className="title">SVG logo animi</h2>
      <div>
        <svg
          id="svgTitle"
          width="922"
          height="439"
          viewBox="0 0 922 439"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="922" height="439" fill="white" />
          <path
            ref={pathRef1}
            d="M158.385 291.066C159.622 278.232 165.06 265.917 165.835 252.854C166.641 239.258 166.048 225.545 166.048 211.937C166.048 194.338 166.667 177.364 168.46 159.92C169.215 152.576 167.783 145.104 168.602 137.777C168.851 135.546 172.401 138.8 172.859 139.102C182.39 145.385 192.526 151.022 202.373 156.993C212.151 162.922 221.572 169.201 228.482 177.314C233.105 182.74 235.286 189.047 239.692 194.542C248.945 206.083 248.859 215.475 242.53 228.337C238.474 236.58 233.858 245.397 228.553 253.241C223.993 259.985 218.257 262.81 210.32 266.77C205.178 269.335 202.789 273.837 197.975 276.544C189.727 281.18 179.716 284.081 171.724 288.858C166.801 291.8 152 296.711 152 302"
            stroke="url(#paint0_linear_1_2)"
            stroke-width="13"
            stroke-linecap="round"
          />
          <path
            ref={pathRef2}
            d="M278 254.146C280.283 217.62 283.083 181.296 283.083 144.707C283.083 141.249 285.19 151.426 286.472 154.736C296.758 181.291 304.962 208.833 318.102 234.639C323.347 244.94 329.632 255.315 335.894 265.277C337.536 267.891 339 269.138 339 272"
            stroke="url(#paint1_linear_1_2)"
            stroke-width="13"
            stroke-linecap="round"
          />
          <path
            ref={pathRef3}
            d="M275 216C289.71 216 304.187 217 319 217"
            stroke="url(#paint2_linear_1_2)"
            stroke-width="13"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_2"
              x1="199.5"
              y1="137"
              x2="199.5"
              y2="302"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3ADAFD" />
              <stop offset="1" stop-color="#CF0000" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1_2"
              x1="308.5"
              y1="144"
              x2="308.5"
              y2="272"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3ADAFD" />
              <stop offset="1" stop-color="#CF0000" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1_2"
              x1="297"
              y1="216"
              x2="297"
              y2="217"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3ADAFD" />
              <stop offset="1" stop-color="#CF0000" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Test;
