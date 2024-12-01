import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ dashboardData }) => {


    // Create the pie chart data object with the sample data and customizations
    // Replace the example data with your actual data and adjust the colors as needed
    const data = {
        labels: dashboardData.pieChartData.map(data => data.label),
        datasets: [
            {
                label: 'Weekly Calories Burned',
                data: dashboardData.pieChartData.map(data => data.value),// Example data for the pie chart
                backgroundColor: [
                    'rgba(153, 102, 255, 1)', // Purple
                    'rgba(75, 192, 192, 1)',  // Green
                    'rgba(54, 162, 235, 1)',  // Blue
                    'rgba(255, 99, 132, 1)',  // Red
                ],
                borderColor: 'white',        // White border for clear gaps
                borderWidth: 10,             // Larger gap between segments
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
        <div className="min-w-[330px] shadow-lg h-[400px] p-4 rounded-lg lg:w-[430px] w-full border border-gray flex flex-col items-center">
            <div className='w-full flex justify-start'>
                <h3 className='text-blue-500 '>Weekly Calories burned</h3>

            </div>
            <div>
                <Pie data={data} options={options} />

            </div>
        </div>
    );
};

export default CategoryChart;
