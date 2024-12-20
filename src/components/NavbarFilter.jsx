import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../assets/features/carsSlice";

const NavbarFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.cars.filters); // Фильтры из Redux
  const [showFilterModal, setShowFilterModal] = useState(false); // Управление модальным окном

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log("filter changed:", { [name]: value }); // добавьте это
    dispatch(setFilters({ ...filters, [name]: value })); // Обновление фильтров
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setShowFilterModal(false); // Закрытие модального окна после применения фильтров
  };

  const handleResetFilters = () => {
    dispatch(resetFilters()); // Сброс фильтров
  };

  return (
    <div className="p-4 bg-gray-900 text-white shadow-lg">
      {/* Верхняя панель навигации */}
      <div className="flex justify-between items-center">
        {/* Логотип или заголовок */}
        
        {/* Ссылки на страницы */}
        <div className="flex space-x-6 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-orange-400 transition-colors duration-300"
          >
            Главная
          </Link>
          <Link
            to="/favorites"
            className="hover:text-orange-400 transition-colors duration-300"
          >
            Избранные
          </Link>
        </div>
  
        {/* Кнопка открытия модального окна фильтров */}
        <button
          onClick={() => setShowFilterModal(true)}
          className="bg-orange-500 py-2 px-4 rounded-lg hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105"
        >
          Фильтры
        </button>
      </div>
  
      {/* Модальное окно фильтров */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-h-[90vh] w-96 overflow-auto shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Фильтры</h3>
            <form onSubmit={handleFilterSubmit} className="space-y-4">
              {/* Фильтры */}
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Мин. цена"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Макс. цена"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              <input
                type="text"
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                placeholder="Марка"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              <select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleFilterChange}
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              >
                <option value="">Тип топлива</option>
                <option value="Бензин">Бензин</option>
                <option value="Дизель">Дизель</option>
                <option value="Электро">Электро</option>
              </select>
              <input
                type="number"
                name="engineVolume"
                value={filters.engineVolume}
                onChange={handleFilterChange}
                placeholder="Объем двигателя"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              <input
                type="number"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="Год выпуска"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
              
              {/* Кнопки управления */}
              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105"
                >
                  Применить фильтры
                </button>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-transform duration-300 transform hover:scale-105"
                >
                  Сбросить
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilterModal(false)}
                  className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-transform duration-300 transform hover:scale-105"
                >
                  Закрыть
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );  
};

export default NavbarFilter;
