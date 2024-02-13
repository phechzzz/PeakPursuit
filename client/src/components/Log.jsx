import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { CREATE_ACTIVITY } from '../utils/mutations';


const Log = () => {
  const [exerciseLog, setExerciseLog] = useState([
    {
      name: 'Run',
      time: '1 hour',
      distance: '10 miles',

    },
    {
      name: 'Bike',
      time: '30 minutes',
      distance: '5 miles',
      
    },
    
  ]);
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
    <div className="mt-8">
      <label htmlFor="price" className="block text-2xl font-medium leading-6 text-gray-900 text-center mb-4">
        EXERCISE LOG
      </label>
      <button onClick={toggleForm} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 flex items-center mx-auto">
        <span className="text-xl font-semibold">+</span>
        <span className="ml-2"></span>
      </button>
      {showForm && (
        <form onSubmit={addExercise} className="mt-4 flex justify-center">
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
          <li key={index} className="bg-purple-100 shadow-md rounded-md mb-4 mx-4">
            <div className="p-4 flex items-center">
              {exercise.name === 'Running' && <FaRunning className="text-purple-600 mr-2" />} {/* Running icon */}
              {exercise.name === 'Biking' && <FaBiking className="text-purple-600 mr-2" />} {/* Biking icon */}
              <div>
                <p className="text-lg font-semibold leading-6 text-gray-900">{exercise.name}</p>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">
                    <span className="font-semibold">Time:</span> {exercise.time}
                  </p>
                  <p className="text-sm leading-5 text-gray-500">
                    <span className="font-semibold">Distance:</span> {exercise.distance}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Log;