import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../../Documents/my-app/src/features/carsSlice"; // Импортируем действие для удаления из избранного

const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем список избранных машин из Redux
  const favoriteCars = useSelector((state) => state.cars.favorites);

  // Если нет избранных машин, показываем сообщение
  if (favoriteCars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">
          Ваш список избранного пуст
        </h2>
        <button
          onClick={() => navigate("/product")}
          className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Вернуться к каталогу
        </button>
      </div>
    );
  }

  // Обработчик удаления из избранного
  const handleRemoveFromFavorites = (carId) => {
    dispatch(removeFromFavorites(carId));
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
        Избранные машины
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favoriteCars.map((car) => (
          <div
            key={car.id}
            className="bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {car.name}
              </h2>
              <p className="text-gray-400 text-lg mb-4">
                Цена:{" "}
                <span className="font-bold text-orange-500">{car.price} ₸</span>
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => navigate(`/product/${car.id}`)}
                  className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                >
                  Подробнее
                </button>
                <button
                  onClick={() => handleRemoveFromFavorites(car.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
