import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from '../constant';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from '@mui/material';
import { CircularProgress } from '@mui/material';
const Login = ({ setIsUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);  // For Snackbar visibility
  const [alertMessage, setAlertMessage] = useState(""); // For custom alert message
  const [alertType, setAlertType] = useState("success"); // For alert severity
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleCloseSnackbar = () => {
    setAlertOpen(false);
  };
  // Handle login logic

  const handleLogin = async (e) => {
    setLoader(true);
    e.preventDefault();

    try {
      const response = await fetch(url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      setLoader(false);
      const data = await response.json();
      console.log(data.user);

      if (response.ok) {
        // Login successful
        setIsUser(true); // Set user as logged in

        // Store token in cookies (client-side)
        Cookies.set('token', data.token, { expires: 1 }); // expires in 1 day

        localStorage.setItem('user', JSON.stringify(data.user));
        setAlertMessage(data.message || "Registration failed");
        setAlertType("success");
        setAlertOpen(true);
        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        setAlertMessage(data.message || "Registration failed");
        setAlertType("error");
        setAlertOpen(true);
        // Display error if login fails
      }
    } catch (error) {
      setAlertMessage("An error occurred. Please try again.");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Responsive container */}
      <div className="container mx-auto max-w-sm flex flex-col justify-center items-center gap-3">
        <h3 className="text-black text-3xl font-bold">Welcome to FitMentor</h3>
        <p className="text-gray-400 text-sm">Enter Details to Login</p>

        {/* Display error message if login fails */}

        {/* Email input */}
        <input
          className="border-2 border-black p-2 w-full rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          className="border-2 border-black p-2 w-full mt-2 rounded-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <Button variant="contained"
          className="bg-blue-500 text-white p-2 w-full mt-2 cursor-pointer rounded-lg"
          onClick={handleLogin}
        >
          {loader ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Alert positioned at the top center
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

export default Login;