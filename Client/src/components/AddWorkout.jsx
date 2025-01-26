import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Alert, Snackbar, TextField, Typography, Box } from '@mui/material';
import { Button, CircularProgress } from '@mui/material';
import url from '../constant';

const AddWorkout = ({ setIsWorkoutAdded }) => {
    const [workoutData, setWorkoutData] = useState({
        category: '',
        name: '',
        duration: '',
        sets: '',
        reps: '',
        weight: '',
    });
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");
    const token = Cookies.get('token');
    const [loader, setLoader] = useState(false);
    // Update form fields
    const handleChange = (e) => {

        const { name, value } = e.target;
        setWorkoutData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Close Snackbar
    const handleCloseSnackbar = () => {
        setAlertOpen(false);
    };

    // Submit the form
    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        setAlertOpen(false);
        try {
            const response = await fetch(`${url}/addWorkout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workoutData),
            });
            setLoader(false);
            const data = await response.json();
            setWorkoutData({
                category: '',
                name: '',
                duration: '',
                sets: '',
                reps: '',
                weight: '',
            });
            if (response.ok) {
                const user = JSON.parse(localStorage.getItem('user'));
                user.credit = data.credit;

                localStorage.setItem('user', JSON.stringify(user));

                // Success message and UI update
                setAlertMessage(data.message || "Workout added successfully!");
                setAlertType("success");
                setIsWorkoutAdded(true);
            } else {
                setAlertMessage(data.message || "Failed to add workout.");
                setAlertType("error");
            }
        } catch (error) {
            setAlertMessage("An error occurred while adding the workout.");
            setAlertType("error");
            console.error('Error:', error);
        } finally {
            setAlertOpen(true); // Open Snackbar after any result
        }
    };

    return (
        <div className="min-w-[330px] shadow-lg h-auto p-4 rounded-lg lg:w-[430px] w-full border border-gray flex flex-col items-center">
            <div className='w-full flex justify-start'>
                <h3 className='text-blue-500 '>Weekly Calories burned</h3>

            </div>
            {/* <h3 className='text-blue-500 '>Weekly Calories burned</h3> */}


            <form onSubmit={handleSubmit}>
                {/* MUI Inputs */}
                {Object.keys(workoutData).map((key) => (
                    <TextField
                        key={key}
                        fullWidth
                        margin="normal"
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        name={key}
                        value={workoutData[key]}
                        onChange={handleChange}
                        required
                    />
                ))}

                {/* Submit Button */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    type="submit"
                >{loader ? <CircularProgress size={24} /> : "Add Workout"}

                </Button>
            </form>

            {/* Snackbar for Feedback Messages */}
            <Snackbar
                open={alertOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={alertType}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>

    );
};

export default AddWorkout;
