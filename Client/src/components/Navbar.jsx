import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import UploadPhoto from "./UploadPhoto";
import ShowPhoto from "./ShowPhoto";
import { FaCoins } from "react-icons/fa6";
import url_api from "../constant";
const Navbar = ({ setOpen, setIsUser, update }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard"); // State to manage active tab
    const [profileClick, setProfileClick] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [showPhoto, setShowPhoto] = useState(false);
    const [credit, setCredit] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setCredit(user.credit);
        if ("profilePhoto" in user) {
            console.log("this is user from navbar compoennet", user)
            setProfilePhoto(user.profilePhoto);
            console.log("profilePhoto from navbar", profilePhoto)
        }
    }, [profileClick, setProfilePhoto, update]);

    const handleProfileClick = () => {
        setProfileClick(!profileClick);
    }
    const handleLogOut = () => {
        Cookies.remove('token'); // Assuming you're using `js-cookie` to manage cookies
        setIsUser(false); // Set user login status to false
        //change location after logout the router path without navigation
        window.location.href = '/';

    }
    const showProfilePhoto = () => {
        setShowPhoto(!showPhoto);
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
                <div className="flex justify-center items-center gap-2 mr-10">
                    <FaCoins className="text-3xl text-gray-600" />
                    {credit}
                </div>
                {
                    profilePhoto !== null ? (<div onClick={showProfilePhoto} className="flex rounded-full size-8 bg-gray-500 shadow-2xl justify-center items-center cursor-pointer"><img className="rounded-full size-8 shadow-xl border border-gray-400" src={url_api + profilePhoto}></img></div>) : <FaUserCircle onClick={handleProfileClick} className="text-3xl text-gray-600 cursor-pointer" />
                }


                <p className="text-blue-500 cursor-pointer" onClick={handleLogOut}>Logout</p>
            </div>

            {profileClick && <UploadPhoto handleProfileClick={handleProfileClick} />}
            {showPhoto && <ShowPhoto showProfilePhoto={showProfilePhoto} />}

        </div >
    );
};

export default Navbar;
