import React from 'react'
import { GiWeight } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { GiDuration } from "react-icons/gi";

const WorkoutCards = ({ workout }) => {
    return (
        <div className='p-2 w-full lg:w-[400px] border border-gray-300 rounded-lg shadow-lg h-auto mt-3 transform transition-transform duration-300 hover:scale-105  hover:shadow-xl hover:border hover:border-blue-200 hover:border-2'>
            <span className='font-semibold text-blue-500 p-2 bg-blue-500 bg-opacity-25 rounded-lg text-xs'>#{workout.category}</span>
            <h4 className='font-semibold text-gray-800 text-xl'>{workout.workoutName}</h4>
            <div className='flex gap-2 items-center w-full'>
                <div className='flex gap-2 items-center'>
                    <CgGym className='text-2xl text-black' />

                    <p className='text-gray-600 text-sm'>Count: {workout.sets} Sets x {workout.reps} reps</p>

                </div>
                <div className='flex gap-2 items-center'>
                    <GiWeight className='text-2xl text-black' />
                    <p className='text-gray-600 text-sm'>{workout.weight}kg</p>

                </div>

            </div>
            <div className='flex gap-2 items-center'>
                <GiDuration className='text-2xl text-black' />
                <p className='text-gray-600 text-sm'>Duration: {workout.duration} minutes</p>

            </div>



        </div>
    )
}

export default WorkoutCards;
