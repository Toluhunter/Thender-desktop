import React from "react";
import ButtonSmall from "../Button/ButtonSmall";

function ActiveRequest({username, to, fileName, fileSize, sent=0, status="sending", type="offline"}) {
    return (
        <div className="bg-white py-8 px-8 text-lg shadow-md flex flex-col rounded-md relative">
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
            <div className="flex justify-between">
                <div className="flex shrink-0 items-center space-x-10">
                    <div className="space-y-2">
                        <p className="font-bold underline">{username} {"->"} {to}</p>
                        <p className="font-bold">File name: <span className="font-light text-gray-700">{fileName}</span></p>
                        <p className="font-bold">File Size: <span className="font-light text-gray-700">{fileSize}</span></p>
                        <p className="font-bold">Sent: <span className="font-light text-gray-700">{sent} Bytes</span></p>
                    </div>
                </div>

            </div>

            <div className="w-full bg-green-400 mt-3 h-3 overflow-hidden bg-gray-200 rounded-full">
                {status === "sending" ? (
                    <div className="bg-green-400 h-full w-1/3 rounded-full"></div>
                ) : (
                    <div className="bg-yellow-300 h-full w-1/2 rounded-full"></div>
                )}
            </div>

            <div className="flex self-end justify-end space-x-4 mt-5">
                <ButtonSmall text="Cancel" variant="danger"/>
                {status === "sending" ? (
                    <ButtonSmall text="Pause" variant="pending"/>
                ) : (
                    <ButtonSmall text="Resume" variant="success"/>
                )}
            </div> 
        </div>
    );
}

export default ActiveRequest;
