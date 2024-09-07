import React from 'react';
import robot from "../../../public/about-group.png";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Side - Text Content */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Transforming Ideas into <span className="text-orange-500">MVP Innovations</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Unleashing the potential of engineering students by transforming their ideas into market-ready products. The unique incubator program provides a nurturing environment where innovation meets execution, bridging the gap between academic learning and real-world entrepreneurship.
          </p>
          <div className="mt-8">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600">
              Contact us
            </button>
          </div>
        </div>

        {/* Right Side - Images */}
        <div className="relative flex items-center justify-center mb-8 md:mb-0">
          <div className="relative w-64 h-64 md:w-72 md:h-72">
            {/* Placeholder for the first image */}
            <Image
            src={robot}
            width={"300px"}
            height={"auto"}
            alt="Robot"
            className="max-w-[300px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px]"
          />
            {/* Optional Instructor Badge */}
            <div className="absolute -top-4 -right-4 flex items-center justify-center bg-white p-2 rounded-full shadow-lg">
              <div className="text-center">
                <span className="text-xs font-medium text-gray-700">250+ BEST INSTRUCTORS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="absolute w-full h-full transform scale-150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path fill="#fff" fillOpacity="1" d="M0,256L1440,320L1440,0L0,0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
