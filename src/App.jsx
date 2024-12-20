import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import About from "./pages/About";
import Cars from "./pages/Cars"
import Services from "./pages/Services";
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginSignup from './pages/LoginSignup';


const initialCars = [
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
  // Добавь больше машин с разными параметрами
];

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState(initialCars); // Используем переменную initialCars
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

  const addToFavorites = (car) => {
    if (!favorites.some((fav) => fav.id === car.id)) {
      setFavorites([...favorites, car]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const isFavorite = (carId) => {
    return favorites.some((car) => car.id === carId);
  };
  const resetFilters = () => {
    setCars(initialCars); // Сбрасываем отфильтрованные машины и показываем все
  };
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
          path="/product/:id"
          element={
            <ProductPage
              cars={cars}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={isFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favoriteCars={cars.filter((car) => isFavorite(car.id))}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/services" element={<Services />} />
          <Route path="/product" element={<HomePage cars={cars} />} />
          <Route path="/login-signup" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

