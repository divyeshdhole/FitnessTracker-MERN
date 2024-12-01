import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
const Navbar = ({ setOpen, setIsUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard"); // State to manage active tab
    const handleLogOut = () => {
        Cookies.remove('token'); // Assuming you're using `js-cookie` to manage cookies
        setIsUser(false); // Set user login status to false
        //change location after logout the router path without navigation
        window.location.href = '/';

    }

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setIsOpen(false); // Close the menu on tab click
        setOpen(false);
    };

    return (
        <div className="w-full h-[100px] px-6 flex justify-between items-center shadow-lg">
            <div className="flex gap-2 items-center justify-center">
                {isOpen ? (
                    <IoCloseOutline
                        className="text-xl cursor-pointer lg:hidden text-gray-600"
                        onClick={() => {
                            setIsOpen(false);
                            setOpen(false);
                        }}
                    />
                ) : (
                    <IoMdMenu
                        className="text-xl cursor-pointer lg:hidden text-gray-600"
                        onClick={() => {
                            setIsOpen(true);
                            setOpen(true);
                        }}
                    />
                )}
                <img src={logo} className="h-[100px] w-[100px]" alt="Logo" />
            </div>
            <div className="gap-4 hidden lg:flex">
                <Link
                    to="/dashboard"
                    className={`${activeTab === "dashboard"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-800"
                        }`}
                    onClick={() => handleTabClick("dashboard")}
                >
                    DashBoard
                </Link>
                <Link
                    to="/workouts"
                    className={`${activeTab === "workouts"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-800"
                        }`}
                    onClick={() => handleTabClick("workouts")}
                >
                    Workouts
                </Link>
                <Link
                    to="/tutorial"
                    className={`${activeTab === "tutorial"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-800"
                        }`}
                    onClick={() => handleTabClick("tutorial")}
                >
                    Tutorial
                </Link>
            </div>
            {isOpen && (
                <div className="lg:hidden flex flex-col bg-white shadow-lg absolute top-[70px] left-0 w-full z-10 p-4 rounded-lg">
                    <Link
                        to="/dashboard"
                        className={`${activeTab === "dashboard"
                            ? "text-blue-500 font-semibold border-b-2 border-blue-500 py-2 hover:bg-blue-100 transition-colors duration-300"
                            : "text-gray-800 font-semibold py-2 hover:bg-blue-100 transition-colors duration-300"
                            }`}
                        onClick={() => handleTabClick("dashboard")}
                    >
                        DashBoard
                    </Link>
                    <Link
                        to="/workouts"
                        className={`${activeTab === "workouts"
                            ? "text-blue-500 font-semibold border-b-2 border-blue-500 py-2 hover:bg-blue-100 transition-colors duration-300"
                            : "text-gray-800 font-semibold py-2 hover:bg-blue-100 transition-colors duration-300"
                            }`}
                        onClick={() => handleTabClick("workouts")}
                    >
                        Workouts
                    </Link>
                    <Link
                        to="/tutorial"
                        className={`${activeTab === "tutorial"
                            ? "text-blue-500 font-semibold border-b-2 border-blue-500 py-2 hover:bg-blue-100 transition-colors duration-300"
                            : "text-gray-800 font-semibold py-2 hover:bg-blue-100 transition-colors duration-300"
                            }`}
                        onClick={() => handleTabClick("tutorial")}
                    >
                        Tutorial
                    </Link>
                </div>
            )}

            <div className="flex gap-2 items-center">
                <FaUserCircle className="text-3xl text-gray-600" />
                <p className="text-blue-500 cursor-pointer" onClick={handleLogOut}>Logout</p>
            </div>
        </div>
    );
};

export default Navbar;
