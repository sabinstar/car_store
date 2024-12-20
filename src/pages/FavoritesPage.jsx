// import React from "react";
// import { useNavigate } from "react-router-dom";

// const FavoritesPage = ({ favoriteCars, removeFromFavorites }) => {
//   const navigate = useNavigate();

//   // Если нет избранных машин, показываем сообщение
//   if (favoriteCars.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Ваш список избранного пуст</h2>
//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//         >
//           Вернуться к каталогу
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Избранные машины</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {favoriteCars.map((car) => (
//           <div
//             key={car.id}
//             className="bg-white shadow-md rounded-lg overflow-hidden"
//           >
//             <img
//               src={car.image}
//               alt={car.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{car.name}</h2>
//               <p className="text-gray-600">Цена: {car.price} ₸</p>
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => navigate(`/product/${car.id}`)}
//                   className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
//                 >
//                   Подробнее
//                 </button>
//                 <button
//                   onClick={() => removeFromFavorites(car.id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
//                 >
//                   Удалить
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FavoritesPage;
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../src/assets/features/carsSlice.js"; // Импортируем действие для удаления из избранного

const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем список избранных машин из Redux
  const favoriteCars = useSelector((state) => state.cars.favorites);

  // Если нет избранных машин, показываем сообщение
  if (favoriteCars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Ваш список избранного пуст</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Избранные машины</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCars.map((car) => (
          <div key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{car.name}</h2>
              <p className="text-gray-600">Цена: {car.price} ₸</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/product/${car.id}`)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Подробнее
                </button>
                <button
                  onClick={() => handleRemoveFromFavorites(car.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
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
