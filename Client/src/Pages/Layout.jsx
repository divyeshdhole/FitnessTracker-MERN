import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom'; // Import Outlet
import { useState } from "react";
import PersonalAssistant from "../components/PersonalAssistance";
import Loader from "../components/loader/Loader";
const Layout = ({ setIsUser, isUser }) => {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(0);
    if (!isUser)
        return <Loader />

    return (
        <div>
            <Navbar setOpen={setOpen} setIsUser={setIsUser} update={update} />
            {open ? <div className="mt-[120px] lg:mt-0">

            </div> : null
            }
            <Outlet context={{ update, setUpdate }} />
            <PersonalAssistant update={update} setUpdate={setUpdate} />
        </div>
    );
};

export default Layout;