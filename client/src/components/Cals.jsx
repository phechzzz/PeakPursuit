import { useState } from 'react';

const food = [
  {
    name: 'Bagel',
    calories: '290 Calories',
    protein: '10g',
    carbs: '53g',
    fats: '4g',
  },
  {
    name: 'Banana',
    calories: '110',
    protein: '1g',
    carbs: '28g',
    fats: '0',
  },
];

const Cals = () => {
  const [foodLog, setFoodLog] = useState(food);

  const addFood = () => {
    const newFood = {
      name: 'New Food',
      calories: '500',
      protein: '30g',
      carbs: '45g',
      fats: '22g',
    };

    setFoodLog([...foodLog, newFood]);
  };

  return (
    <>
      <label htmlFor="price" className="block text-lg font-medium leading-6 text-gray-900">
        Food Log
      </label>
      <button onClick={addFood} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add Food
      </button>
      <ul role="list" className="mt-4 divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
        {foodLog.map((food, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{food.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Calories: {food.calories}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Protein: {food.protein}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Carbs: {food.carbs}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Fats: {food.fats}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cals;