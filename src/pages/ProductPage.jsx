import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../assets/features/carsSlice";
import NavbarFilter from "../components/NavbarFilter";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const car = useSelector((state) =>
    state.cars.cars.find((car) => car.id === parseInt(id))
  );

  const favorites = useSelector((state) => state.cars.favorites);
  const isFavorite = favorites.some((favCar) => favCar.id === parseInt(id));

  useEffect(() => {
    if (!car) {
      navigate("/");
    }
  }, [car, navigate]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car));
    }
  };
  const resetFilters = () => {
    setCars(initialCars); // Сбрасываем отфильтрованные машины и показываем все
  };

  const applyFilters = (filters) => {
    const { minPrice, maxPrice, brand, fuelType, engineVolume, year } = filters;

    const filtered = initialCars.filter((car) => { // Используем исходный список для фильтрации
      const isInPriceRange =
        (!minPrice || car.price >= minPrice) && (!maxPrice || car.price <= maxPrice);
      const matchesBrand = !brand || car.brand.toLowerCase().includes(brand.toLowerCase());
      const matchesFuelType = !fuelType || car.fuelType.toLowerCase().includes(fuelType.toLowerCase());
      const matchesEngineVolume = !engineVolume || car.engineVolume === parseFloat(engineVolume);
      const matchesYear = !year || car.year === parseInt(year);

      return (
        isInPriceRange &&
        matchesBrand &&
        matchesFuelType &&
        matchesEngineVolume &&
        matchesYear
      );
    });

    setCars(filtered); // Обновляем состояние отфильтрованными машинами
  };

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 font-poppins">
        <h2 className="text-2xl font-semibold text-orange-500">
          Машина не найдена
        </h2>
      </div>
    );
  }

  return (
    <>
    
    <div className="bg-gray-900 min-h-screen p-8 font-poppins">
      <div className="max-w-6xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col">
          <h1 className="text-4xl font-bold text-orange-500 mb-6">
            {car.name}
          </h1>
          <p className="text-gray-400 text-lg mb-6">{car.description}</p>
          <div className="flex flex-wrap mb-6">
            <div className="w-1/2 text-gray-400 mb-4">
              <p>
                <strong>Цена:</strong> {car.price} ₸
              </p>
              <p>
                <strong>Год выпуска:</strong> {car.year}
              </p>
              <p>
                <strong>Объём двигателя:</strong> {car.engineVolume} л
              </p>
            </div>
            <div className="w-1/2 text-gray-400">
              <p>
                <strong>Тип топлива:</strong> {car.fuelType}
              </p>
              <p>
                <strong>Пробег:</strong> {car.mileage} км
              </p>
              <p>
                <strong>Марка:</strong> {car.brand}
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-auto">
            <button
              onClick={handleFavoriteToggle}
              className={`flex-1 ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white py-2 px-4 rounded-lg transition`}
            >
              {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            </button>
            <button
              onClick={() => navigate("/product")}
              className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ProductPage;
