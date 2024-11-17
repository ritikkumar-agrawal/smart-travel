import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex-col items-center mx-56 gap-9 relative">
      <h1 className="font-extrabold text-[58px] text-center mt-16 ">
        <span className="text-[#f56551]">
          Get into Your Next Adventure with AI{" "}
        </span>
        personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center mt-5">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <div className="flex justify-center mt-9">
        <Link to={"/create-trip"} className="text-current">
          <button className="bg-gray-600 block">Get Started  </button>
        </Link>
      </div>
      <img src="./front.avif" className="mt-7 rounded-3xl w-auto h-screen fade-edges" />
    </div>
  );
}

export default Hero;
