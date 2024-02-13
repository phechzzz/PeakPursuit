import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { CREATE_ACTIVITY } from '../utils/mutations';

const Log = () => {
  const [exerciseLog, setExerciseLog] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    type: 'run',
    distance: '',
    time: '',
  });
  const [createActivity] = useMutation(CREATE_ACTIVITY);
  
  // Assume the user ID is obtained from the logged-in user's context or from elsewhere
  const userId = 'user_id_here';

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (data && data.getUser) {
      setExerciseLog(data.getUser.activities);
    }
  }, [data]); // Add data as dependency

  const addExercise = async () => {
    try {
      const { data } = await createActivity({
        variables: {
          type: newExercise.type,
          distance: newExercise.distance,
          time: newExercise.time,
        },
      });
      const createdExercise = data.createActivity;
      setExerciseLog([...exerciseLog, createdExercise]);
      setNewExercise({ type: 'run', distance: '', time: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewExercise({
      ...newExercise,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <label htmlFor="price" className="block text-lg font-medium leading-6 text-gray-900">
        Exercise Log
      </label>
      <button onClick={toggleForm} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        {showForm ? 'Hide Form' : 'Add Exercise'}
      </button>
      {showForm && (
        <form onSubmit={addExercise} className="mt-4">
          <div className="flex space-x-4">
            <select name="type" value={newExercise.type} onChange={handleChange} className="form-select">
              <option value="run">Run</option>
              <option value="walk">Walk</option>
              <option value="bike">Bike</option>
              <option value="swim">Swim</option>
            </select>
            <input
              type="text"
              name="distance"
              placeholder="Distance"
              value={newExercise.distance}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="time"
              placeholder="Time"
              value={newExercise.time}
              onChange={handleChange}
              className="form-input"
            />
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
              Add
            </button>
          </div>
        </form>
      )}
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