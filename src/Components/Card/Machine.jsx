import React from "react";
import accountIcon from "../../../public/img/account.svg";
import lanIcon from "../../../public/icon/lan.svg";

/** Account icon, username and description */
function Avatar({username, description}) {
    return (
        <div className="space-y-2 flex flex-col items-center">
            <img src={accountIcon} className="w-24 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Account icon" />
            <div className="space-y-2 text-center">
            <h4 className="text-lg font-medium">{username}</h4>
            <p className="text-base font-normal">{description}</p>
            </div>
        </div>
    );
}

function Device({deviceType, ip}) {
    return (
        <div className="flex flex-col space-y-6 items-center">
            <p className="text-lg font-medium">{deviceType}</p>
            <div className="flex items-center space-x-3">
                <img src={lanIcon} className="w-6 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Ip address icon" />
                <p className="text-lg font-medium">{ip}</p>
            </div>
        </div>
    );
}

/** Used in the offline stage as the cards showing user details */
function Machine({username, description, deviceType, ip}) {
    return (
        <div className="flex items-center justify-between bg-white shadow-md px-5 py-4 max-w-md rounded-md w-full">
            <Avatar username={username} description={description} />
            <Device deviceType={deviceType} ip={ip} />
        </div>
    );
}

export default Machine;
export { Avatar, Device }