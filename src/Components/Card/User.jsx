import React from "react";
import downloadIcon from "../../../public/icon/white_download.svg";

function User({photo, name, status="offline"}) {
    return (
        <div className="shadow-md rounded-lg flex flex-col items-center space-y-4 py-5 px-8 bg-white">
            <div className="relative ">
                <img className="w-28 h-28 rounded-full color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" src={photo} alt={`${name} profile image`} />
                <span className={`top-0 right-5 absolute w-5 h-5 border-2 border-white rounded-full 
                        ${status !== "offline"? "bg-green-400" :  "bg-gray-400"}`}></span>
            </div>

            <p className="font-bold">{name}</p>

            <button className={`flex space-x-4 items-center bg-primary p-4 text-white rounded-lg 
                    ${status === "offline" ? "opacity-30 cursor-not-allowed": "hover:bg-primaryLight"}`}
                    disabled={status === "offline"}>
                <img src={downloadIcon} className="w-5 h-5 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Download icon" />
                <p className="font-bold">Send file</p>
            </button>
        </div>
    );
}

export default User;
