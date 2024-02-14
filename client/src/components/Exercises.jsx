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
        <div className="exerciseBg">
            <div className="exerciseContainer">
                <h1 className="exerciseHeader">Search Workouts</h1>
                <div>
                    <input
                        className="exercise-input"
                        type="text"
                        placeholder="Enter a Muscle Group"
                        value={muscle}
                        onChange={handleInputChange}
                    />
                    <button className="exercise-btn" onClick={handleSearch}>
                        Search
                    </button>
                    {/* Add a clear button */}
                    <button className="exercise-btn" onClick={handleClearSearch}>
                        Clear
                    </button>
                </div>
                {exercises.length > 0 ? (
                    <div className="exerciseList">
                        {exercises.slice(0, 8).map((exercise) => (
                            <div className="exercise-card" key={exercise.name}>
                                <h3 className="exercise-title">{exercise.name}</h3>
                                <p className="exercise-detail">Type: {exercise.type}</p>
                                <p className="exercise-detail">Muscle: {exercise.muscle}</p>
                                <p className="exercise-detail">Equipment: {exercise.equipment}</p>
                                <p className="exercise-detail">Difficulty: {exercise.difficulty}</p>
                                <p className="exercise-detail">Instructions: {exercise.instructions}</p>
                            </div>
                        ))}
                    </div>
                ) : searchPerformed && (
                    <div className="exerciseList-no-results">No exercises found. Try a different search.</div>
                )}
            </div>
        </div>
    );
};

export default ExerciseList;
