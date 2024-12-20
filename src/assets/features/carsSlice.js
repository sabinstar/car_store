import { createSlice } from "@reduxjs/toolkit";

// В carsSlice.js
const initialState = {
  cars: [],
  favorites: [],
  filters: { // Добавляем состояние фильтров
    minPrice: "",
    maxPrice: "",
    brand: "",
    fuelType: "",
    engineVolume: "",
    year: "",
  },
};

// Создание слайса
const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    addToFavorites: (state, action) => {
      const car = action.payload;
      if (!state.favorites.some((fav) => fav.id === car.id)) {
        state.favorites.push(car);
      }
    },
    removeFromFavorites: (state, action) => {
      const id = action.payload;
      state.favorites = state.favorites.filter((car) => car.id !== id);
    },
    setFilters: (state, action) => { // Действие для установки фильтров
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        minPrice: "",
        maxPrice: "",
        brand: "",
        fuelType: "",
        engineVolume: "",
        year: "",
      };
    },
  },
});

export const { setCars, addToFavorites, removeFromFavorites, setFilters, resetFilters } = carsSlice.actions;
export default carsSlice.reducer;
