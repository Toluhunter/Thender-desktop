import React from "react";
import ButtonSmall from "../Button/ButtonSmall";
import addIcon from "../../../public/icon/add.svg";
import profilePhoto from "../../../public/img/avatar.svg";

function Tick() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"
            className="w-5 h-5 text-blue-600 font-bold">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

function CheckText({text}) {
    return (
        <>  
            <div className="flex items-center gap-2 py-2.5">
                <Tick />
                <p className="font-medium text-primary">{text}</p>
            </div>
        </>
    );
}

function UserSearch({image, id, username, disabled, added, handleAdd}) {
    const profilePic = image ? image : profilePhoto;
    
  return (
      <>
        <div className="flex items-center justify-between">
            <div className="flex shrink-0 items-center space-x-6">
                <div className="shrink-0">
                    <img src={profilePic} alt="User profile image" className="w-10 h-10 bg-zinc-100 rounded-full color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" />
                </div>
        
                <div className="space-y-2">
                    <p className="font-bold"><span className="font-light text-gray-700">@{username}</span></p>
                </div>
        
            </div>

            {
                !added ? (
                    <ButtonSmall text="Add" variant="primary" disabled={disabled} onClick={handleAdd}>
                        <div className="flex items-center space-x-2">
                            <img src={addIcon} alt="Add icon" className={`w-5.5 h-5.5 color-transparent object-cover indent-[100%] block 
                                overflow-hidden whitespace-nowrap`} />
                            <span>Add</span>
                        </div>
                    </ButtonSmall>
                ) : (
                    <CheckText text="Added" />
                )
            }
        </div>
      </>
  )
}

export default UserSearch;
