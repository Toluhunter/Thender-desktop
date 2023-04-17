import React from "react";
import ButtonSmall from "../Button/ButtonSmall";

function FriendRequest({image, fullName, username, email}) {
    return (
        <div className="bg-white py-8 px-8 text-lg shadow-md flex justify-between rounded-md">
            <div className="flex shrink-0 items-center space-x-10">
                <div className="shrink-0">
                    <img src={image} alt="User profile image" className="w-20 h-20 rounded-full color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" />
                </div>

                <div className="space-y-2">
                    <p className="font-bold">Fullname: <span className="font-light text-gray-700">{fullName}</span></p>
                    <p className="font-bold">Username: <span className="font-light text-gray-700">{username}</span></p>
                    <p className="font-bold">Email: <span className="font-light text-gray-700">{email}</span></p>
                </div>
            </div>

            <div className="flex self-center justify-end space-x-4">
                <ButtonSmall text="Decline" variant="cancel"/>
                <ButtonSmall text="Accept" variant="success"/>
            </div> 
        </div>
    );
}

export default FriendRequest;
