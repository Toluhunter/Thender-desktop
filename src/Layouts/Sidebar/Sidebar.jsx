import React from "react";
import { Link, redirect } from "react-router-dom";
import Logo from "../../../public/icon/logo.svg";
import logoutIcon from "../../../public/icon/logout.svg";
import offlineIcon from "../../../public/icon/offline.svg";
import pendingIcon from "../../../public/icon/pending.svg";
import requestsIcon from "../../../public/icon/requests.svg";
import friendIcon from "../../../public/icon/friend.svg";
import onlineIcon from "../../../public/icon/online.svg";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";


function SideLink({text, icon, to, active, bubble=false, count=0}) {
    return (
        <Link to={to} className={ `flex space-x-4 items-center cursor-pointer text-lg py-2.5 mb-px hover:bg-indigo-500 
                            ${active === to ? "bg-indigo-500" : ""}`}>
            <img src={icon} className="ml-4 py-2" />
            <p>{text}</p>
            {
                bubble && (
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-green-600 rounded-full">
                        {count}
                    </span>
                )
            }
        </Link>
    );
}

function Sidebar() {
    const { logout } = useAuth();
    const { pathname } = useLocation();

    const handleLogout = async () => {
        /** Logs a user out */
        try {
            logout();
        } catch(error) {}

        return redirect("/login");
    }

    return (
        <>
            <aside className="relative shrink-0 z-50 w-0 sm:w-64" aria-label="Sidebar">
                <div className="fixed top-0 left-0 h-screen 50 w-0 pt-6 transition-transform -translate-x-full bg-sideNav border-r border-gray-200 sm:translate-x-0 sm:w-64">
                    <div className="h-full pb-4 overflow-y-auto bg-sideNav">
                        <div className="flex justify-center items-center text-white">
                            <Link to="/dashboard">
                                <img src={Logo} className="w-14 h-14 mr-3" alt="Thender Logo" />
                            </Link>
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap font-extrabold">THender</span>
                        </div>
                        <ul className="space-y-2 py-4 mt-5 font-medium text-white">
                            <li>
                                <h4 className="mb-2 mx-4 font-bold text-sm">
                                    Transfer
                                </h4>
                                <SideLink text="Online" icon={onlineIcon} to="/dashboard" active={pathname} />
                                <SideLink text="Offline" icon={offlineIcon} to="/offline" active={pathname} />
                            </li>
                            
                            <li>
                                <h4 className="mb-2 mx-4 font-bold text-sm">
                                    Requests
                                </h4>
                                <SideLink text="Friends" icon={friendIcon} to="/friends" active={pathname} />
                                <SideLink text="Transfer" icon={requestsIcon} to="/transfer" active={pathname} bubble={true} count={0} />
                            </li>
                
                            <li>
                                <h4 className="mb-2 mx-4 font-bold text-sm">
                                    Transfer Progress
                                </h4>
                                <SideLink text="Active" icon={pendingIcon} to="/active" active={pathname} bubble={true} count={0} />
                            </li>
                        </ul>

                        <button onClick={handleLogout} className="fixed bottom-0 mt-0 py-4 pl-2 lg:pr-36 flex space-x-4 items-center w-full cursor-pointer bg-danger text-white text-lg pr-0.5" type="button">
                            <img src={logoutIcon} className="w-7 h-7 ml-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
                &nbsp;
            </aside>
        </>
    );
}

export default Sidebar;
