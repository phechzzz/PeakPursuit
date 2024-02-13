import { useState } from 'react';

const goal = [
  {
    name: 'Losing weight',
    description: 'lose 20 pounds',
    deadline: 'July 1',
  },
  {
    name: 'Running',
    description: 'run a mile in 6 minutes',
    deadline: 'August 1',
  },
];

const Goal = () => {
  const [goalLog, setGoalLog] = useState(goal);

  const addGoal = () => {
    const newGoal = {
      name: 'New Goal',
      description: 'Description',
      deadline: 'Deadline',
    };

    setGoalLog([...goalLog, newGoal]);
  };

  return (
    <>
      <label htmlFor="price" className="block text-lg font-medium leading-6 text-gray-900">
        Goal Tracker
      </label>
      <div className="mt-4 flex justify-center items-center">
        <img
          src="https://via.placeholder.com/400x200"
          alt="Placeholder"
          className="w-full h-auto max-w-sm"
        />
      </div>
      <button onClick={addGoal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add Goal
      </button>
      <ul role="list" className="mt-4 divide-y divide-gray-100 max-h-[calc(75vh-250px)] overflow-y-auto">
        {goalLog.map((goal, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{goal.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">You want to {goal.description} by {goal.deadline}.</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Goal;