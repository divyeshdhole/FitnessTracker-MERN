import Navbar from "../components/Navbar";
import { Outlet } from 'react-router-dom'; // Import Outlet
import { useState } from "react";
import PersonalAssistant from "../components/PersonalAssistance";
const Layout = ({ setIsUser }) => {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(0);


    return (
        <div>
            <Navbar setOpen={setOpen} setIsUser={setIsUser} update={update} />
            {open ? <div className="mt-[120px] lg:mt-0">
                <Outlet context={{ update, setUpdate }} />
            </div> : <Outlet context={{ update, setUpdate }} />
            }
            <PersonalAssistant update={update} setUpdate={setUpdate} />
        </div>
    );
};

export default Layout;