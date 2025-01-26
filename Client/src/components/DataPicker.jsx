import React, { useState, useEffect } from 'react';

const DatePicker = ({ setDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(9);
    const year = 2024;
    //get current month
    useEffect(() => {
        setCurrentMonth(new Date().getMonth());
    }, []);

    const map = {
        0: "january",
        1: "february",
        2: "march",
        3: "april",
        4: "may",
        5: "june",
        6: "july",
        7: "august",
        8: "september",
        9: "october",
        10: "november",
        11: "december"
    };


    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleDateClick = (day) => {
        const formattedDate = `${year}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(day);
        setDate(formattedDate);
        console.log(formattedDate) // Pass the formatted date to the parent component
    };

    const changeMonth = (direction) => {
        setCurrentMonth((prev) => {
            const newMonth = prev + direction;
            return newMonth < 0 ? 11 : newMonth > 11 ? 0 : newMonth; // Wrap around months
        });
    };

    return (
        <div className="max-w-[500px] lg:w-[40%] p-4 border rounded-lg shadow-lg bg-white h-[500px]">
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <h3 className="text-xl font-bold mb-2">{`${new Date(year, currentMonth).toLocaleString('default', { month: 'long' })} ${year}`}</h3>
            <div className="flex justify-between mb-4">
                <button className="text-gray-600" onClick={() => changeMonth(-1)}>←</button>
                <button className="text-gray-600" onClick={() => changeMonth(1)}>→</button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="font-bold text-center">{day}</div>
                ))}
                {days.map((day) => (
                    <div
                        key={day}
                        className={`cursor-pointer text-center p-2 rounded-lg transition duration-200   
                        ${selectedDate === day ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => handleDateClick(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
            {selectedDate && (
                <div className="mt-4 text-center">
                    <h4 className="font-semibold">Selected Date:</h4>
                    <p className="text-lg">{`${map[currentMonth]} ${selectedDate}, ${year}`}</p>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
