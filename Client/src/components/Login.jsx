import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from '../constant';

const Login = ({ setIsUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      console.log(data.user);
      if (response.ok) {
        // Login successful
        setIsUser(true); // Set user as logged in

        // Store token in cookies (client-side)
        Cookies.set('token', data.token, { expires: 1 }); // expires in 1 day

        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        // Display error if login fails
        setError(data.message || 'Invalid login credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Responsive container */}
      <div className="container mx-auto max-w-sm flex flex-col justify-center items-center gap-3">
        <h3 className="text-black text-3xl font-bold">Welcome to FitMentor</h3>
        <p className="text-gray-400 text-sm">Enter Details to Login</p>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
        <button
          className="bg-blue-500 text-white p-2 w-full mt-2 cursor-pointer rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;