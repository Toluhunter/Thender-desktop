import React, { useState } from "react";
import downloadIcon from "../../../public/icon/white_download.svg";
import Popup from "../Popup/Popup";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS } from "../../Routes/url";
import Message from '../../Components/Message/Message';
import { redirect } from "react-router-dom";


function User({photo, id, name, status="offline"}) {
    /** transferring functionality */
    const [file, setFile] = useState(null);
    const [fileHash, setFileHash] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const { postWithToken, accessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");


    const getFileHash = async (selectedFile) => {
        /** Get a file has of a given hash */
        const hashBuffer = await selectedFile.arrayBuffer();
        const hashData = await crypto.subtle.digest("SHA-256", hashBuffer);
        const hashArray = Array.from(new Uint8Array(hashData));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        return hashHex;
    }

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(() => selectedFile);

        // Calculate the hash of the uploaded file
        const hashHex = await getFileHash(selectedFile);
        setFileHash(() => hashHex);

        setShowConfirm(() => true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(() => true);
        setSuccess(() => false);
        const data = {
            "reciever": id,
            "file_name": file.name,
            "file_location": `/none/${file.name}`,
            "file_hash": fileHash,
            "total_size": file.size
        }

        try {
            // Send request and await response
            const response = await postWithToken(data, PATHS.addTransmission, accessToken);
      
            if (response.status === 201) { // Successfully created
              setSuccess(() => true);
              setMessage(() => "Transmisson started!"); // Text for slide in message
              setShowConfirm(() => false); // close popup
              // Redirect to login after 2 seconds
              setTimeout(() => {
                return redirect("/active", {replace: true});
              }, 2000);
            }
        } catch(error) {
        }
    
        setLoading(() => false);
    }

    return (
        <>
            <div className="shadow-md rounded-lg flex flex-col items-center space-y-4 py-5 px-8 bg-white">
                <div className="relative ">
                    <img className="w-28 h-28 rounded-full color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" src={photo} alt={`${name} profile image`} />
                    <span className={`top-0 right-5 absolute w-5 h-5 border-2 border-white rounded-full 
                            ${status !== "offline"? "bg-green-400" :  "bg-gray-400"}`}></span>
                </div>

                <p className="font-bold">{name}</p>
                { status !== "offline" && (
                    <form action="#" onSubmit={handleSubmit} method="post">
                        <label htmlFor={`${name}-file`} className={`flex space-x-4 items-center bg-primary p-4 text-white rounded-lg 
                                ${status === "offline" ? "opacity-30 cursor-not-allowed": "hover:bg-primaryLight"}`}
                                disabled={status === "offline"} > 
                            <img src={downloadIcon} className="w-5 h-5 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Download icon" />
                            <p className="font-bold">Send file</p>
                        </label>
                        <input type="file" className="hidden" onChange={handleFileChange} id={`${name}-file`} />

                        {showConfirm && (
                            <Popup handleState={setShowConfirm}>
                                <div className="bg-white shadow-md z-50 py-6 p-10 rounded-md">
                                    <h3 className="font-serif text-3xl text-center font-bold text-black mb-4">
                                        Ready to send
                                    </h3>
                                    
                                    <p className="text-base text-center">File name: {file.name}</p>
                                    <p className="text-base text-center">File size: {file.size}</p>

                                    <div className={`flex self-center justify-center space-x-4 mt-6 lg:mt-0 ${loading ? "opacity-40": ""}`}>
                                        <button type="button" onClick={() => {
                                            setShowConfirm(() => false)
                                        }} disabled={loading}
                                            className="py-2.5 px-6 bg-gray-500 text-white font-semibold drop-shadow-md rounded hover:bg-gray-400 active:drop-shadow-none">
                                            Cancel
                                        </button>

                                        <button type="submit" disabled={loading}
                                            className={`py-2.5 px-6 bg-green-500 text-white font-semibold drop-shadow-md rounded hover:bg-green-400 active:drop-shadow-none  ${loading ? "opacity-40": ""}`}>
                                            Send
                                        </button>
                                    </div> 
                                </div>
                            </Popup>
                            )}
                    </form>
                )}
            </div>
            {
                success && (
                <div className="fixed left-4 bottom-4 flex flex-col space-y-4 z-[100]">
                    <Message type="success" message={message} status={success} />
                </div>
                )
            }
        </>
    );
}

export default User;
