

import React from "react";

const FeatureCard = ({ id, img, name, price }) => {
  return (
    <div
      className="border-2 border-gray-200 bg-white text-black rounded-xl mb-2 shadow-lg cursor-pointer hover:scale-95 hover:bg-gray-100 transition duration-200 ease-linear"
      key={id}
    >
      <div>
        <img
          src={img}
          alt="Car"
          className="rounded-t-xl w-full h-48 object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-center items-start">
        <h1 className="font-semibold text-lg text-gray-800">{name}</h1>
        <div className="pt-2">
          <h2 className="font-medium text-gray-600">Starting at</h2>
          <h3 className="text-xl font-bold text-gray-900">${price}</h3>
        </div>
        <div className="mt-4 text-primary font-medium ">
          →
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
