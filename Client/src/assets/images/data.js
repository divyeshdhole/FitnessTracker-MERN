
// Data definition
const data = [
    {
        title: "Calories Burned",
        value: 12000.00,  // Generalize the key name to value
        unit: "kcal",
        icon: "FaFire",
        color: "text-orange-500",
        bg: "bg-orange-500",
        percent: 10,
        description: "Total calories burned today"
    },
    {
        title: "Workouts",
        value: 3,  // Same key for all cards
        icon: "BiTransfer",
        color: "text-blue-500",
        bg: "bg-blue-500",
        percent: 5,
        description: "Total number of workouts completed today"
    },
    {
        title: "Average Calories Burned",
        value: 500.00,
        unit: "kcal",
        icon: "IoIosTrendingUp",
        color: "text-pink-500",
        bg: "bg-green-500",
        percent: -15,
        description: "Average calories burned per workout"
    }
];

export default data;
