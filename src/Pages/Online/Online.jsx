import React, { useState, useEffect, useRef } from "react";
import User from "../../Components/Card/User";
import profilePhoto from "../../../public/img/avatar.svg";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS, socketBaseURL  } from "../../Routes/url";
import { w3cwebsocket as W3CWebSocket } from "websocket";


function Online() {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [offlineFriends, setOfflineFriends] = useState([]);
    const [onlinePeersID, setOnlinePeersID] = useState([]);
    const { accessToken, getWithToken, postWithToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const getWithRef = useRef(getWithToken);
    const tokenRef = useRef(accessToken);

    // Conneect to web socket
    const connectToWebSocket = async () => {
        try {
            console.log(`${socketBaseURL}?token=${tokenRef.current}`);
            const client = new W3CWebSocket(
                `${socketBaseURL}?token=${tokenRef.current}`
            );

            // client.onopen = () => {
            //     console.log("WebSocket Client Connected");
            // };

            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                setOnlinePeersID(() => dataFromServer.peers_online);
            };

            // client.onerror = (error) => {
            //     // console.log("An error has occured", error);
            // };

            return () => {
                client.close();
            };
        } catch (e) {
            // console.log(e.message);
        }
    };

    useEffect(() => {
        let ignore = false;
    
        const getData = async () => {
          try {
            // Connect to web socket
            const client = new W3CWebSocket(
                `${socketBaseURL}?token=${tokenRef.current}`
            );

            // Get all peers
            const response = await getWithRef.current(PATHS.retrievePeers, tokenRef.current);

            client.onmessage = (message) => {
                if (!ignore) {
                    const dataFromServer = JSON.parse(message.data);
                    setOnlinePeersID(() => dataFromServer.peers_online);
                    console.log(response.data.results)
                }
            };
            
          } catch(error) {
              console.log(error);
          }
    
          setLoading(false);
        }
    
        getData();
    
        return () => {
            ignore = true;
            client.close();
        };
      }, []);

    return (
        <>
        <section className="container mx-auto">
            <div className="">
                <h1 className="font-extrabold text-3xl pt-10 mb-4">Online friends</h1>
                <div className="flex gap-8 flex-wrap">
                    <User photo={profilePhoto} name={"Jonathan2002"} status={"online"} />
                    <User photo={profilePhoto} name={"Jonathan2002"} status={"online"} />
                </div>

                <div className="">
                    <h1 className="font-extrabold text-3xl pt-10 mb-4">Offline friends</h1>
                    <div className="flex gap-8 flex-wrap">
                        <User photo={profilePhoto} name={"Cynthia2002"} status={"offline"} />
                        <User photo={profilePhoto} name={"Cynthia2002"} status={"offline"} />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Online;
