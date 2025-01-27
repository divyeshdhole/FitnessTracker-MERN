import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from './Pages/Authentication.jsx';
import Dashboard from './components/DashBoard.jsx';
import Home from './Pages/Layout.jsx';
import Workouts from './components/Workouts.jsx';
import Tutorial from './components/Tutorial.jsx';
import Cookies from 'js-cookie';  // Import js-cookie
import url from './constant.js'
function App() {
  const [isUser, setIsUser] = useState(false);  // Manage user login status
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  const validateToken = async () => {
    console.log(isUser);
    const token = Cookies.get('token');  // Get token from cookies
    console.log(token);
    if (token) {
      const res = await fetch(url + '/verifyToken', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'

        }
      }

      )
      const isValidToken = await res.json();
      console.log('isValidToken', isValidToken);  // Log the validity of the token in the console for debugging purposes.
      console.log(isValidToken)
      if (isValidToken.success) {
        setIsUser(true);
      }  // Set user login status to true if token is valid
      else {
        Cookies.remove('token');
        navigate('/authentication');

      }
    } else {
      navigate('/authentication');  // Redirect to authentication if no token
    }
  }
  useEffect(() => {
    validateToken();
  }, []);
  // if the location is / only the  redircet to dashboard
  if (window.location.pathname === '/') {
    navigate('/dashboard');
  }
  return (
    <div className='text-black w-full h-full'>
      <Routes>
        {/* Protected Routes */}

        <Route path="/" element={<Home setIsUser={setIsUser} isUser={isUser} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="tutorial" element={<Tutorial />} />
        </Route>


        {/* Public Routes */}
        <Route path="/authentication" element={<Authentication setIsUser={setIsUser} isUser={isUser} />} />
      </Routes>
    </div>
  );
}

export default App;
