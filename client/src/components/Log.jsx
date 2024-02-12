import { useState } from 'react';

const exercises = [
  {
    name: 'Running',
    time: '40 minutes',
    distance: '5 miles',
  },
  {
    name: 'Swimming',
    time: '10 minutes',
    distance: '400 meters',
  },
];

const Log = () => {
  const [exerciseLog, setExerciseLog] = useState(exercises);

  const addExercise = () => {
    const newExercise = {
      name: 'New Exercise',
      time: '30 minutes',
      distance: '3 miles',
    };

    setExerciseLog([...exerciseLog, newExercise]);
  };

  return (
    <>
      <label htmlFor="price" className="block text-lg font-medium leading-6 text-gray-900">
        Exercise Log
      </label>
      <button onClick={addExercise} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add Exercise
      </button>
      <ul role="list" className="mt-4 divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
        {exerciseLog.map((exercise, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{exercise.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{exercise.time}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{exercise.distance}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Log;