import CountCard from './CountCard';
import data from '../assets/images/data';
import WeeklyStats from './WeeklyStats';
import CategoryChart from './CategoryChart';
import AddWorkout from './AddWorkout';
import { useState, useEffect } from 'react';
import WorkoutCards from './WorkoutCards';
import Cookies from 'js-cookie';
import ShimmerLoader from './Shimmers';
const DashBoard = () => {
    const [workout, setWorkout] = useState("");
    const [dashboardData, setDashboardData] = useState([]);
    const [error, setError] = useState(undefined);
    const [isWorkoutAdded, setIsWorkoutAdded] = useState(false);
    //use Effect to fetch the Dashboard data
    useEffect(() => {
        // Get the token from cookies or localStorage
        const token = Cookies.get('token');  // Assuming you're using `js-cookie` to manage cookies
        console.log(token);
        const fetchData = async () => {
            try {
                const response = await fetch('https://fitness-tracker-api-black.vercel.app/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Include token in Authorization header
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data);  // Log the fetched data for debugging
                setDashboardData(data);  // Set the fetched data in state
            } catch (error) {
                setError(error);  // Handle any errors
            }
        };

        fetchData();
    }, [isWorkoutAdded]);
    useEffect(() => {
        setTimeout(() => {
            setIsWorkoutAdded(false);
        }, 3000);
    }, [isWorkoutAdded]);
    // Only run this once when the component mounts
    if (dashboardData.length === 0) {
        return <ShimmerLoader />  // Show loading message while waiting for data to load
    }


    return <div className="w-full p-5 lg:py-11 lg:px-[100px]">

        <h3 className="text-2xl font-bold text-gray-800">DashBoard</h3>
        <div className='flex flex-wrap justify-between w-full lg:flex-row gap-4'>
            <div className='flex flex-col gap-4 lg:flex-row w-full lg:w-full lg:h-auto lg:justify-between'>
                {data.map((item, index) => (
                    <CountCard key={index} item={item} dashboardData={dashboardData} />
                ))}

            </div>
            <div className='flex justify-between w-full flex-row lg:flex-row flex-wrap gap-2'>
                <WeeklyStats dashboardData={dashboardData} />
                <CategoryChart dashboardData={dashboardData} />
                <AddWorkout Workout={workout} setWorkout={setWorkout} setIsWorkoutAdded={setIsWorkoutAdded} />
            </div>
            <div className='w-full'>
                <h3 className='text-xl font-semibold text-gray-600'>Todays Workout</h3>
                <div className='flex flex-col gap-4 lg:flex-row w-full lg:w-full lg:h-auto lg:flex-wrap'>

                    {dashboardData.todaysWorkouts.map((workout, index) => (
                        <WorkoutCards key={index} workout={workout} />
                    ))
                    }
                </div>
            </div>



        </div>


    </div>
}
export default DashBoard;