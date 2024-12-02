import React, { useState } from 'react';
import Cookies from 'js-cookie';
import CategoryChart from './CategoryChart';
const AddWorkout = ({ setIsWorkoutAdded }) => {
    const [workoutData, setWorkoutData] = useState({
        category: '',
        name: '',
        duration: '',
        sets: '',
        reps: '',
        weight: '',
    }); // State to hold individual workout inputs
    const [message, setMessage] = useState(''); // State to hold feedback message
    const token = Cookies.get('token');
    // Function to update state for each input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutData({
            ...workoutData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://fitness-tracker-api-black.vercel.app/addWorkout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workoutData),
            });

            if (response.ok) {
                const data = await response.json(); // Handle response JSON
                setMessage(data.message);
            } else {
                setMessage('Failed to add workout. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to add workout. Please try again.');
        }
    };


    return (
        <div className="min-w-[350px] shadow-lg h-auto lg:w-[430px] p-4 rounded-lg w-full border border-gray">
            <h2 className="text-blue-500">Add a New Workout</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="block text-gray-600">category</label>
                    <input
                        type="text"
                        name="category"
                        value={workoutData.category}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                        placeholder="e.g., legs"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-600">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={workoutData.name}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                        placeholder="e.g., Push-ups"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-600">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={workoutData.duration}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                        placeholder="e.g., 30 minutes"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-600">Sets</label>
                    <input
                        type="number"
                        name="sets"
                        value={workoutData.sets}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                        placeholder="e.g., 3"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-600">Reps</label>
                    <input
                        type="number"
                        name="reps"
                        value={workoutData.reps}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                        placeholder="e.g., 10"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-600">Weight</label>
                    <input
                        type="number"
                        name="weight"
                        value={workoutData.weight}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                        placeholder="e.g., 100kg"
                    />
                </div>

                <button className="mt-4 bg-blue-500 text-white p-2 w-full rounded-lg" type="submit" onClick={() => {
                    setIsWorkoutAdded(true);
                }}>
                    Add Workout
                </button>
            </form>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>} {/* Display feedback message */}
        </div>
    );
};

export default AddWorkout;
