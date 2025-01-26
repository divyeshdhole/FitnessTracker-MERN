import React from 'react';
import './loader.css';
const Loader = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        </div>

    );
};

export default Loader;