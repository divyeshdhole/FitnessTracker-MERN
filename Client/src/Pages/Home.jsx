import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom'; // Import Outlet
import { useState } from "react";
const Home = ({ setIsUser }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Navbar setOpen={setOpen} setIsUser={setIsUser} />
            {open ? <div className="mt-[120px] lg:mt-0">
                <Outlet />
            </div> : <Outlet />}
        </div>
    );
};

export default Home;