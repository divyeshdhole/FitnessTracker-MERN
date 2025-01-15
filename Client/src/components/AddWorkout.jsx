import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Alert, Snackbar, TextField, Typography, Box } from '@mui/material';
import { Button } from '@mui/material';
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

            const data = await response.json();

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
        <Box
            sx={{
                boxShadow: 3,
                padding: 4,
                borderRadius: 2,
                maxWidth: 430,
                bgcolor: '#fff'
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
                Add a New Workout
            </Typography>

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
                >
                    Add Workout
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
        </Box>
    );
};

export default AddWorkout;
