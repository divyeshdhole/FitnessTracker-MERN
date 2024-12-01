import React from 'react';

// Shimmer component using Tailwind CSS
const Shimmer = () => {
    return (
        <div className="animate-pulse bg-gray-200 h-full w-full"></div>
    );
};

// Shimmer Loader for multiple elements
const ShimmerLoader = () => {
    return (
        <div className="p-4 space-y-4">
            <div className="h-36 w-full bg-gray-300 rounded-lg overflow-hidden">
                <Shimmer />
            </div>
            <div className="h-36 w-full bg-gray-300 rounded-lg overflow-hidden">
                <Shimmer />
            </div>
            <div className="h-36 w-full bg-gray-300 rounded-lg overflow-hidden">
                <Shimmer />
            </div>
        </div>
    );
};

export default ShimmerLoader;
