import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';

const ExerciseList = () => {
    const [muscle, setMuscle] = useState('');
    // Add a state to track whether the search has been performed
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchExercises, { loading, error, data }] = useLazyQuery(GET_EXERCISES);

    const handleInputChange = (e) => setMuscle(e.target.value);

    const handleSearch = () => {
        searchExercises({ variables: { muscle } });
        setSearchPerformed(true); // Set to true when search is performed
    };

    // Function to clear the search results
    const handleClearSearch = () => {
        setMuscle('');
        setSearchPerformed(false); // Reset the searchPerformed state
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    const exercises = searchPerformed ? data?.getExercises || [] : [];

    return (
        <div className="flex flex-col items-center pb-4 mb-4">
    <div className="flex flex-col items-center">
        <h1 className="block text-2xl font-medium leading-6 text-gray-900 mt-4 font-montserrat">Search Workouts</h1>
        <div className="mt-2">
            <input
                className="form-input mt-2 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:border-purple-500"
                type="text"
                placeholder="Enter a Muscle Group"
                value={muscle}
                onChange={handleInputChange}
            />
            <button
                className="mt-2 px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 text-sm"
                onClick={handleSearch}>
                Search
            </button>
            {/* Add a clear button */}
            <button
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 text-sm"
                onClick={handleClearSearch}>
                X
            </button>
        </div>
        {exercises.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {exercises.slice(0, 8).map((exercise) => (
                    <div className="py-5 bg-white shadow-md" key={exercise.name}>
                        <h3 className="text-sm font-semibold leading-6 text-gray-900">{exercise.name}</h3>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Type: {exercise.type}</p>
                        <p className="truncate text-xs leading-5 text-gray-500">Muscle: {exercise.muscle}</p>
                        <p className="truncate text-xs leading-5 text-gray-500">Equipment: {exercise.equipment}</p>
                        <p className="truncate text-xs leading-5 text-gray-500">Difficulty: {exercise.difficulty}</p>
                        <p className="truncate text-xs leading-5 text-gray-500">Instructions: {exercise.instructions}</p>
                    </div>
                ))}
            </div>
        ) : searchPerformed && (
            <div className="exerciseList-no-results text-sm font-semibold leading-6 text-gray-900 mt-4">No exercises found. Try a different search.</div>
        )}
    </div>
</div>

    );
};

export default ExerciseList;
