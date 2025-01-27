import React, { useEffect, useState } from "react";
import url_api from "../constant";
import Cookies from 'js-cookie'
import axios from "axios";
const DatePicker = ({ setDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [dates, setDates] = useState([]);
    const today = new Date();
    const currentYearValue = today.getFullYear();
    const currentMonthValue = today.getMonth();
    const currentDayValue = today.getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const handleDateClick = (day) => {
        const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
        )}-${String(day).padStart(2, "0")}`;
        setSelectedDate(day);
        setDate(formattedDate);
        console.log(formattedDate); // Pass the formatted date to the parent component
    };

    const yearOptions = Array.from(
        { length: currentYearValue - 1970 + 1 },
        (_, i) => 1970 + i
    );

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }
    useEffect(() => {
        //Fetch the of all workouts done by the user
        const fetchData = async () => {
            // const res = await fetch(`${url_api}/getDates`, {
            //     method: 'get',
            //     headers: {
            //         'Authorization': `Bearer ${Cookies.get('token')}`,
            //         'Content-Type': 'application/json'
            //     }
            // });
            const res = await axios.get(`${url_api}/getDates`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })

            const workoutDates = await res.data;
            console.log("the dates are:", workoutDates);

            setDates(workoutDates);
        }
        fetchData();


    }, [])
    return (
        <div className="max-w-[500px] lg:w-[40%] p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <div className="flex justify-between items-center mb-4 gap-4">
                <select
                    className="p-2 border rounded-lg"
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                >
                    {monthNames.map((month, index) => (
                        <option
                            key={index}
                            value={index}
                            disabled={
                                currentYear === currentYearValue && index > currentMonthValue
                            }
                        >
                            {month}
                        </option>
                    ))}
                </select>
                <select
                    className="p-2 border rounded-lg"
                    value={currentYear}
                    onChange={(e) => {
                        const selectedYear = parseInt(e.target.value);
                        setCurrentYear(selectedYear);

                        if (selectedYear === currentYearValue) {
                            setCurrentMonth(Math.min(currentMonth, currentMonthValue));
                        }
                    }}
                >
                    {yearOptions.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center font-bold mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="text-gray-500">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                    const isDisabled =
                        currentYear === currentYearValue &&
                        currentMonth === currentMonthValue &&
                        day > currentDayValue;

                    return (
                        <div
                            key={index}
                            className={`cursor-pointer text-center p-2 rounded-lg transition duration-200 ${day === selectedDate
                                ? "bg-blue-500 text-white"
                                : day
                                    ? isDisabled
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "hover:bg-gray-200"
                                    : ""
                                }`}
                            onClick={() => !isDisabled && day && handleDateClick(day)}
                        >
                            {day || ""}
                        </div>
                    );
                })}
            </div>
            {selectedDate && (
                <div className="mt-4 text-center">
                    <h4 className="font-semibold">Selected Date:</h4>
                    <p className="text-lg">
                        {`${monthNames[currentMonth]} ${selectedDate}, ${currentYear}`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
