import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "../assets/features/carsSlice";

const Services = () => {
  const [formData, setFormData] = useState({
    modelName: "",
    year: "",
    mileage: "",
    price: "",
    description: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    brandId: "",
    images: [],
    volumeOfEngine: "",
    driving: "",
    vehicleType: "",
    quantity: "",
  });

  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (key === "images" && formData.images.length > 0) {
        formData.images.forEach((file) => {
          data.append("images", file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });
  
    console.log("FormData being sent:");
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    try {
      const token = localStorage.getItem("jwt"); // Получение токена из localStorage
  
      if (!token) {
        throw new Error("JWT token is missing. Please log in.");
      }
  
      const response = await axios.post("http://34.47.217.147:8080/cars", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Добавляем JWT токен
        },
      });

      
  
      console.log("Car added successfully:", response.data);
      dispatch(setCars([...cars, response.data]));
  
      // Очистка формы
      setFormData({
        modelName: "",
        year: "",
        mileage: "",
        price: "",
        description: "",
        fuelType: "Petrol",
        transmission: "Automatic",
        brandId: "",
        images: [],
        volumeOfEngine: "",
        driving: "FRONT",
        vehicleType: "SUV",
        quantity: "",
      });
    } catch (error) {
      console.error(
        "Error adding new car:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Add New Car</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Model Name</label>
          <input
            type="text"
            name="modelName"
            value={formData.modelName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Mileage</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Elector">Elector</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Transmission</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          >
            <option value="CVT">CVT</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Brand ID</label>
          <input
            type="text"
            name="brandId"
            value={formData.brandId}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Images</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Volume of Engine</label>
          <input
            type="number"
            name="volumeOfEngine"
            value={formData.volumeOfEngine}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Driving</label>
          <select
            name="driving"
            value={formData.driving}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          >
            <option value="FRONT">FRONT</option>
            <option value="BACK">BACK</option>
            <option value="FULL">FULL</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vehicle Type</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
            required
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="SUV">SUV</option>
            <option value="SEDAN">Sedan</option>
            <option value="HATCHBACK">Hatchback</option>
            <option value="COUPE">Coupe</option>
            <option value="HYBRID">Hybrid</option>
            <option value="CONVERTIBLE">Convertible</option>
            <option value="VAN">Van</option>
            <option value="ELECTRIC">Electric</option>
          </select>
      </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border rounded focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default Services;
