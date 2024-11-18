import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center px-4 md:px-16 lg:px-24 xl:px-56 gap-9 relative">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-[58px] text-center mt-16">
        <span className="text-[#ef4444]">
          Get into Your Next Adventure with AI{" "}
        </span>
        <p className="font-medium py-4">
          personalized{" "}
          <span
            style={{
              color: "#fde047",
              // textDecoration: "underline",
              textDecorationThickness: "thin",
              // display: "inline-block",
            }}
          >
            Itineraries
          </span>{" "}
          <span
            style={{
              // color: "#fde047",
              // textDecoration: "underline",
              // textDecorationThickness: "thin",
              display: "inline-block",
              marginTop: "1rem",
            }}
          >
            at Your Fingertips
          </span>
        </p>
      </h1>
      <p className="text-sm md:text-base lg:text-xl text-gray-500 text-center mt-5">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <div className="flex justify-center mt-9">
        <Link to={"/create-trip"} className="text-current">
          <button
            variant="outline"
            className="text-black bg-white rounded-none px-4 py-2 border border-black"
          >
            Get Started
          </button>
        </Link>
      </div>
      <img
        src="./front.avif"
        className="mt-7 rounded-3xl w-full h-auto md:h-[60vh] lg:h-screen object-cover fade-edges"
        alt="Adventure"
      />
    </div>
  );
}

export default Hero;
