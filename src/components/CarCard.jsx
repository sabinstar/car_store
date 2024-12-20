import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../assets/features/carsSlice";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Используем для перехода на страницу с деталями
  const favorites = useSelector((state) => state.cars.favorites);
  const isFavorite = favorites.some((favoriteCar) => favoriteCar.id === car.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{car.name}</h2>
        <p className="text-gray-600">Цена: {car.price} ₸</p>
        <p className="text-gray-600">Марка: {car.brand}</p>
        <p className="text-gray-600">Год выпуска: {car.year}</p>

        <div className="mt-4 flex justify-between">
          {/* Кнопка "Подробнее" */}
          <button
            onClick={() => navigate(`/product/${car.id}`)} // Переход на страницу с деталями
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
          >
            Подробнее
          </button>

          {/* Кнопка избранного */}
          <button
            onClick={handleFavoriteToggle}
            className={`${
              isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            } text-white py-2 px-4 rounded transition`}
          >
            {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
