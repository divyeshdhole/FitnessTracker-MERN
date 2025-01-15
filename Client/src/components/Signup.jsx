import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from '../constant';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from "@mui/material";
const Signup = ({ setIsUser }) => {
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);  // For Snackbar visibility
  const [alertMessage, setAlertMessage] = useState(""); // For custom alert message
  const [alertType, setAlertType] = useState("success"); // For alert severity

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCloseSnackbar = () => {
    setAlertOpen(false);
  };
  // Handle signup logic
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(url + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username: email, password }), // Sending name to backend
      });

      const data = await response.json();

      if (response.ok) {
        // Set user state to true after successful registration
        setIsUser(true);

        // Store token in cookies (client-side)
        Cookies.set("token", data.token, { expires: 1 }); // expires in 1 day
        localStorage.setItem('user', JSON.stringify(data.user));
        setAlertType("success");
        setAlertOpen(true);        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setAlertMessage(data.message || "Registration failed");
        setAlertType("error");
        setAlertOpen(true);
      }
    } catch (error) {
      setAlertMessage("An error occurred. Please try again.");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-gray-100">

      {/* UI Elements */}
      <div className="container mx-auto max-w-sm bg-white p-6 shadow-lg rounded-lg flex flex-col justify-center items-center gap-4">
        <h3 className="text-black text-3xl font-bold">Welcome to FitMentor</h3>
        <p className="text-gray-400 text-sm">Enter details to create an Account</p>


        <input
          className="border-2 border-black p-2 w-full rounded-lg"
          type="text"
          placeholder="Name" // Name input field
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border-2 border-black p-2 w-full rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative w-full">
          <input
            className="border-2 border-black p-2 w-full rounded-lg"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <Button variant="contained"
          className="bg-blue-500 text-white p-2 w-full mt-2 cursor-pointer rounded-lg"
          onClick={handleSignup}
        >
          Sign Up
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

export default Signup;