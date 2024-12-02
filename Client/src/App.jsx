import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Authentication from './Pages/Authentication';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Workouts from './components/Workouts';
import Tutorial from './components/Tutorial';
import Cookies from 'js-cookie';  // Import js-cookie

function App() {
  const [isUser, setIsUser] = useState(false);  // Manage user login status
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    console.log(isUser);
    const token = Cookies.get('token');  // Get token from cookies

    if (token) {
      setIsUser(true);  // Set user as logged in if token exists
    } else {
      navigate('/authentication');  // Redirect to authentication if no token
    }
  }, [navigate]);
  // if the location is / only the  redircet to dashboard
  if (window.location.pathname === '/') {
    navigate('/dashboard');
  }
  return (
    <div className='text-black w-full h-full'>
      <Routes>
        {/* Protected Routes */}
        {isUser && (
          <Route path="/" element={<Home setIsUser={setIsUser} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="tutorial" element={<Tutorial />} />
          </Route>
        )}

        {/* Public Routes */}
        <Route path="/authentication" element={<Authentication setIsUser={setIsUser} isUser={isUser} />} />
      </Routes>
    </div>
  );
}

export default App;
