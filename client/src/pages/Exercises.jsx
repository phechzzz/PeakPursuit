import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';

const ExerciseList = () => {
    const [muscle, setMuscle] = useState('');
    const [searchExercises, { loading, error, data }] = useLazyQuery(GET_EXERCISES);

    const handleInputChange = (e) => setMuscle(e.target.value);

    const handleSearch = () => searchExercises({ variables: { muscle } });

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    const exercises = data?.getExercises || [];

    return (
        <div className="exerciseBg">
            <div className="exerciseContainer">
                <h1 className="exerciseHeader">Recommended Exercises</h1>
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
                ) : (
                    <div className="exerciseList-no-results">No exercises found. Try a different search.</div>
                )}
            </div>
        </div>
    );
};

export default ExerciseList;
