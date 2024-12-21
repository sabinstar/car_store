import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCars } from "../assets/features/carsSlice";
import NavbarFilter from "../components/NavbarFilter";
import CarCard from "../components/CarCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const cars = useSelector((state) => state.cars.cars);
  const filters = useSelector((state) => state.cars.filters); 

  const applyFilters = (cars, filters) => {
    return cars.filter((car) => {
      const minPrice = filters.minPrice ? car.price >= filters.minPrice : true;
      const maxPrice = filters.maxPrice ? car.price <= filters.maxPrice : true;
      const brand = filters.brand ? car.brand.includes(filters.brand) : true;
      const fuelType = filters.fuelType ? car.fuelType === filters.fuelType : true;
      const engineVolume = filters.engineVolume ? car.engineVolume >= filters.engineVolume : true;
      const year = filters.year ? car.year >= filters.year : true;

      return minPrice && maxPrice && brand && fuelType && engineVolume && year;
    });
  };
  const resetFilters = () => {
    setCars(initialCars); 
  };

  useEffect(() => {
    const fetchCars = async () => {
      const fetchedCars = [
        {
          id: 1,
          name: "BMW X5",
          brand: "BMW",
          price: 10000000,
          fuelType: "Бензин",
          engineVolume: 4.4,
          year: 2020,
          image: "https://via.placeholder.com/600x400?text=BMW+X5",
        },
        {
          id: 2,
          name: "Audi A6",
          brand: "Audi",
          price: 5000000,
          fuelType: "Дизель",
          engineVolume: 3.0,
          year: 2018,
          image: "https://via.placeholder.com/600x400?text=Audi+A6",
        },
        {
          id: 3,
          name: "Toyota Corolla",
          brand: "Toyota",
          price: 3000000,
          fuelType: "Бензин",
          engineVolume: 1.8,
          year: 2022,
          image: "https://via.placeholder.com/600x400?text=Toyota+Corolla",
        },
      ];
      dispatch(setCars(fetchedCars)); // Сохраняем машины в Redux store
    };

    fetchCars(); // Вызываем функцию загрузки данных
  }, [dispatch]);

  const filteredCars = applyFilters(cars, filters); // Применяем фильтры к списку машин
  
  return (
    <>
    <NavbarFilter applyFilters={applyFilters} resetFilters={resetFilters}/>
    <div className="bg-gray-0 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
        Каталог автомобилей
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
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
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">
                    {car.fuelType} • {car.year}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${car.id}`)}
                    className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-xl">
            Нет доступных машин.
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default HomePage;
