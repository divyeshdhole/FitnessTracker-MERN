import DatePicker from "./DataPicker";
import WorkoutCards from "./WorkoutCards";
import ShimmerLoader from "./ShimmerLoader";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import url from '../constant';

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const token = Cookies.get('token');  // Get token from cookies or localStorage in production code
    const [date, setDate] = useState(new Date(Date.now()).toISOString().split('T')[0]);

    useEffect(() => {

        // Fetch workouts data from server or API
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/workouts/${date}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Include token in Authorization header
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch workouts');
                }
                const data = await response.json();
                console.log("called");
                setWorkouts(data); // Assuming data is an array of workouts
                setIsLoading(false);

            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [date]); // Fetch once when component mounts
    if (isloading) {
        return <ShimmerLoader />;
    }
    console.log("data is: ", workouts, workouts.length, date);
    return (
        <div className="w-full p-5 lg:py-11 lg:px-[100px] flex flex-col lg:flex-row gap-5">
            <DatePicker setDate={setDate} />
            <div className="w-full gap-1">
                <h3 className='text-xl font-semibold text-gray-600'>Today's Workout</h3>
                <div className="flex flex-wrap gap-4 justify-between mt-4">
                    {workouts.length === 0 && <p>No Workout for date: {date}</p>}
                    {workouts.map(workout =>
                        <WorkoutCards workout={workout} />

                    )}

                </div>
            </div>
        </div>
    );
};

export default Workouts;
