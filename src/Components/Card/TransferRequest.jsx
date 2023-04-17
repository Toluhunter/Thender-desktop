import React from "react";

function TransferRequest({image, username, fileName, fileSize, type="offline"}) {
    return (
        <div className="bg-white py-8 px-8 text-lg shadow-md flex justify-between rounded-md relative">
            {
                type === "online" ? (
                    <span className="text-purple-500 bg-white border border-purple-500 px-4 py-1 rounded-md absolute -top-4 right-0">
                        Online transfer
                    </span>
                ): (
                    <span className="text-cyan-500 bg-white border border-cyan-500 px-4 py-1 rounded-md absolute -top-4 right-0">
                        Offline transfer
                    </span>
                )
            }

            <div className="flex shrink-0 items-center space-x-10">
                <div className="shrink-0">
                    <img src={image} alt="User profile image" className="w-20 h-20 rounded-full color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" />
                </div>

                <div className="space-y-2">
                    <p className="font-bold">Username: <span className="font-light text-gray-700">{username}</span></p>
                    <p className="font-bold">File name: <span className="font-light text-gray-700">{fileName}</span></p>
                    <p className="font-bold">File Size: <span className="font-light text-gray-700">{fileSize}</span></p>
                </div>
            </div>

            <div className="flex self-center justify-end space-x-4">
                <button type="button" className="py-2.5 px-6 bg-gray-500 text-white font-semibold drop-shadow-md rounded hover:bg-gray-400 active:drop-shadow-none">
                    Decline
                </button>

                <button type="button" className="py-2.5 px-6 bg-green-500 text-white font-semibold drop-shadow-md rounded hover:bg-green-400 active:drop-shadow-none">
                    Accept
                </button>
            </div> 
        </div>
    );
}

export default TransferRequest;
