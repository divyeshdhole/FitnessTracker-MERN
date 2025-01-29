import logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import UploadPhoto from "./UploadPhoto";
import ShowPhoto from "./ShowPhoto";
import { FaCoins } from "react-icons/fa6";
import url_api from "../constant";
import { GiTwoCoins } from "react-icons/gi";
import { Tooltip, IconButton } from "@mui/material";
import { BsFire } from "react-icons/bs";
import ShowStreak from "./ShowStreak";
const Navbar = ({ setOpen, setIsUser, update }) => {
    const location = useLocation();
    const aTab = location.pathname.split('/')[1];
    console.log("the location is :", aTab == "");
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(aTab); // State to manage active tab
    const [profileClick, setProfileClick] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [showPhoto, setShowPhoto] = useState(false);
    const [credit, setCredit] = useState(null);
    const [streak, setStreak] = useState(JSON.parse(localStorage.getItem('user')).streak);
    const [showStreak, setShowStreak] = useState(false);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        setCredit(user.credit);
        if (streak !== user.streak) {
            setShowStreak(!showStreak)
        }
        setStreak(user.streak);
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
                    className={`${activeTab === "dashboard" || activeTab === ""
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-800"
                        }  hover:text-blue-500 
        transition-all duration-300 ease-in-out hover:font-semibold px-2 py-1 hover:text-xl`}
                    onClick={() => handleTabClick("dashboard")}
                >
                    DashBoard
                </Link>
                <Link
                    to="/workouts"
                    className={`${activeTab === "workouts"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-800"
                        }  hover:text-blue-500 
        transition-all duration-300 ease-in-out hover:font-semibold px-2 py-1 hover:text-xl`}
                    onClick={() => handleTabClick("workouts")}
                >
                    Workouts
                </Link>
                <Link
                    to="/tutorial"
                    className={`${activeTab === "tutorial"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-800"
                        }  hover:text-blue-500 
        transition-all duration-300 ease-in-out hover:font-semibold px-2 py-1 hover:text-xl`}
                    onClick={() => handleTabClick("tutorial")}
                >
                    Tutorial
                </Link>
            </div>

            <div className={`lg:hidden flex flex-col bg-white shadow-lg absolute top-[90px] left-0 w-full z-10 p-4 rounded-lg ${isOpen
                ? "transition ease-in-out duration-300 transform translate-y-0 opacity-100"
                : "transition ease-in-out duration-300 transform opacity-0 translate-y-2 pointer-events-none"
                }`}>
                <Link
                    to="/dashboard"
                    className={`${activeTab === "dashboard" || activeTab === ""
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

            <div className="flex gap-1 items-center">
                <div className="flex justify-center items-center gap-1 mr-10">

                    <Tooltip title="Fire Value: Represent Streak!" arrow>
                        <IconButton>
                            <BsFire className="text-3xl text-orange-500 cursor-pointer" />
                        </IconButton>
                    </Tooltip>
                    <p className="text-orange-500">{streak}</p>
                </div>
                <div className="flex justify-center items-center gap-1 mr-10">

                    <Tooltip title="💰 Coin Value: Represents your available credits. Earn more by adding workouts!" arrow>
                        <IconButton>
                            <GiTwoCoins className="text-3xl text-yellow-600 cursor-pointer" />

                        </IconButton>

                    </Tooltip>

                    <p className="text-yellow-600">{credit}</p>
                </div>
                {
                    profilePhoto !== null ? (<div onClick={showProfilePhoto} className="flex rounded-full size-8 bg-gray-500 shadow-2xl justify-center items-center cursor-pointer"><img className="rounded-full size-8 shadow-xl border border-gray-400" src={url_api + profilePhoto}></img></div>) : <FaUserCircle onClick={handleProfileClick} className="text-3xl text-gray-600 cursor-pointer" />
                }


                <p className="text-blue-500 cursor-pointer" onClick={handleLogOut}>Logout</p>
            </div>

            {profileClick && <UploadPhoto handleProfileClick={handleProfileClick} />}
            {showPhoto && <ShowPhoto showProfilePhoto={showProfilePhoto} />}
            {showStreak && <ShowStreak setShowStreak={setShowStreak} showStreak={showStreak} streak={streak} />}
        </div >
    );
};

export default Navbar;
