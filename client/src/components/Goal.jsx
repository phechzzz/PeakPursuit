import React, { useState } from 'react';
import Confetti from 'react-confetti';

const Goal = () => {
  const initialGoal = [
    {
      name: 'Losing weight',
      description: 'lose 20 pounds',
      deadline: 'July 1',
      completed: false,
    },
    {
      name: 'Running',
      description: 'run a mile in 6 minutes',
      deadline: 'August 1',
      completed: false,
    },
  ];

  const [goalLog, setGoalLog] = useState(initialGoal);
  const [showInput, setShowInput] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [confetti, setConfetti] = useState(false); // State for controlling confetti

  const addGoal = () => {
    setShowInput(true);
  };

  const handleAddGoal = () => {
    if (newGoalName.trim() !== '' && newGoalDescription.trim() !== '' && newGoalDeadline.trim() !== '') {
      const newGoal = {
        name: newGoalName,
        description: newGoalDescription,
        deadline: newGoalDeadline,
        completed: false,
      };

      setGoalLog([...goalLog, newGoal]);
      setNewGoalName('');
      setNewGoalDescription('');
      setNewGoalDeadline('');
      setShowInput(false);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedGoals = [...goalLog];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setGoalLog(updatedGoals);
    setConfetti(true); // Activate confetti when goal is completed

    // Reset confetti after 3 seconds
    setTimeout(() => {
      setConfetti(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center pb-4 mb-4"> {/* Added margin bottom */}
      <label htmlFor="price" className="block text-2xl font-medium leading-6 text-gray-900 mt-4">
        GOAL TRACKER
      </label>
      <button onClick={addGoal} className="mt-2 px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 text-2xl">+</button>
      {showInput && (
        <div className="mt-4">
          <input
            type="text"
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
            placeholder="Enter goal name"
            className="form-input"
          />
          <input
            type="text"
            value={newGoalDescription}
            onChange={(e) => setNewGoalDescription(e.target.value)}
            placeholder="Enter goal description"
            className="form-input mt-2"
          />
          <input
            type="text"
            value={newGoalDeadline}
            onChange={(e) => setNewGoalDeadline(e.target.value)}
            placeholder="Enter deadline"
            className="form-input mt-2"
          />
          <button onClick={handleAddGoal} className="px-4 py-2 mt-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Confirm
          </button>
        </div>
      )}
      {confetti && <Confetti />} {/* Render confetti when activated */}
      <ul role="list" className="mt-4 grid grid-cols-3 gap-4"> {/* Display goals as grid with max 3 columns */}
        {goalLog.map((goal, index) => (
          <li key={index} className="py-5 bg-white shadow-md p-4"> {/* Added margin and padding */}
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">{goal.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">You want to {goal.description} by {goal.deadline}.</p>
            </div>
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => handleCheckboxChange(index)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goal;
