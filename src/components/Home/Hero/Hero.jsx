import React from "react";
import { Link } from "react-router-dom";
import img from "../../../assets/img/hero1.jpg";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat text-white relative"
      style={{
        backgroundImage: `url(${img})`,
        minHeight: "100vh",
      }}
    >
      {/* Полупрозрачный слой */}
      <div className="absolute inset-0 bg-black bg-opacity-15"></div>

      {/* Контент */}
      <div className="relative h-full flex flex-col justify-center items-center container mx-auto px-6">
        {/* Текстовая секция */}
        <div className="w-full space-y-5 mt-40 text-center md:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Find Your Perfect Vehicle Online
          </h1>
          <p className="text-lg lg:text-2xl font-medium">
            Over 1000+ New Cars Available Here
          </p>

          <div className="flex gap-8 mt-5 justify-center md:justify-start">
            <button className="bg-primary py-2 px-6 rounded-md hover:scale-95 transition duration-150 ease-linear">
              Explore More
            </button>
            <Link to="/services">
              <button className="border-2 border-primary py-2 px-6 rounded-md hover:bg-primary transition duration-200 ease-linear">
                Go to Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
