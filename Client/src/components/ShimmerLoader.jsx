import React from 'react';

const ShimmerLoader = () => {
    return (
        <div className='p-[50px]'>
            <div className="w-full h-32 rounded-lg flex gap-3 justify-between">
                <div className="max-w-[500px] lg:w-[40%] p-4 border rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-[400px]"></div>
                <div className='flex flex-col  lg:flex-row w-full h-[100px] gap-3 lg:flex-wrap lg:justify-betwee2'>
                    <div className="w-[32%] h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>
                    <div className="w-[32%] h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>
                    <div className="w-[32%] h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>

                    <div className="w-[32%] h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>
                    <div className="w-[32%] h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>

                    <div className="w-[32%] h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>

                    <div className="w-[32%] h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>

                </div>




            </div>
        </div>

    );
};

export default ShimmerLoader;
