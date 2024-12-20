
import React from "react";
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
            <button className="border-2 border-primary py-2 px-6 rounded-md hover:bg-primary transition duration-200 ease-linear">
              See Cars
            </button>
          </div>
        </div>

        {/* Форма фильтрации */}
        <div className="w-full mt-16 mb-10">
          <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              className="border border-gray-300 rounded-md p-3 text-gray-700"
              defaultValue="Any Makes"
            >
              <option disabled>Any Makes</option>
              <option>BMW</option>
              <option>Audi</option>
              <option>Mercedes</option>
            </select>
            <select
              className="border border-gray-300 rounded-md p-3 text-gray-700"
              defaultValue="Any Models"
            >
              <option disabled>Any Models</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
            </select>
            <select
              className="border border-gray-300 rounded-md p-3 text-gray-700"
              defaultValue="All Prices"
            >
              <option disabled>All Prices</option>
              <option>Below $20,000</option>
              <option>$20,000 - $50,000</option>
              <option>Above $50,000</option>
            </select>
            <button className="bg-primary text-white rounded-md py-3 px-6 hover:bg-orange-600 transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
