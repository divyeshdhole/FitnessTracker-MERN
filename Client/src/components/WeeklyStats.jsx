import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyStats = ({ dashboardData }) => {
    // Sample data for the bar chart


    const data = {
        labels: dashboardData.weeks,
        datasets: [
            {
                label: 'Calories Burned',
                data: dashboardData.caloriesBurned, // Example data
                backgroundColor: 'rgb(102, 102, 255)', // Bold background color
                borderColor: 'rgb(102, 102, 255)', // Bold border color
                borderWidth: 1, // Slightly thicker border
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="min-w-[350px] shadow-lg h-[400px] p-4 rounded-lg lg:w-[430px] w-full border border-gray">
            <h3 className='text-blue-500'>Weekly Calories burned</h3>
            <div className='flex h-full items-center'>
                <Bar data={data} options={options} />

            </div>
        </div>
    );
};

export default WeeklyStats;
