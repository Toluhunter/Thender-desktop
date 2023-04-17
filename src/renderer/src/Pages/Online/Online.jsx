import React, { useState, useEffect, useRef } from "react";
import User from "../../Components/Card/User";
import profilePhoto from "../../../public/img/avatar.svg";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS, socketBaseURL  } from "../../Routes/url";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Spinner from "../../Components/Spinner/Spinner";


function Online() {
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [offlineFriends, setOfflineFriends] = useState([]);
    const onlinePeersID = useRef([]);
    const { accessToken, getWithToken, postWithToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const getWithRef = useRef(getWithToken);
    const tokenRef = useRef(accessToken);
    const clientRef = useRef();


    useEffect(() => {
        let ignore = false;
    
        const getData = async () => {
          try {
            // Connect to web socket
            const client = new W3CWebSocket(
                `${socketBaseURL}?token=${tokenRef.current}`
            );

            clientRef.current = client;

            console.log(`${socketBaseURL}?token=${tokenRef.current}`);

            // Get all peers
            const response = await getWithRef.current(PATHS.retrievePeers, tokenRef.current);

            clientRef.current.onmessage = (message) => {
                if (!ignore) {
                    const dataFromServer = JSON.parse(message.data);
                    onlinePeersID.current = dataFromServer.peers_online;
                    console.log("Online", dataFromServer.peers_online);
                    console.log(response.data.results);

                    // Set all online peers
                    const onlinePeers = response.data.results.filter(peer => {
                        return onlinePeersID.current.includes(peer.id)
                    })
                    setOnlineFriends(() => onlinePeers);

                    // Set all offline peers
                    const offlinePeers = response.data.results.filter(peer => {
                        return !onlinePeersID.current.includes(peer.id)
                    })
                    setOfflineFriends(() => offlinePeers);
                }

                setLoading(false);
            };

            clientRef.current.onerror = (error) => {
                console.log("An error has occured", error);
                setLoading(false);
            };
            
          } catch(error) {
          }
    
        }
    
        getData();
    
        return () => {
            ignore = true;
            clientRef.current.close();
        };
      }, []);

    return (
        <>
        <section className="container mx-auto">
            <div className="">
                <h1 className="font-extrabold text-3xl pt-10 mb-4">Online friends</h1>
                <div className="flex gap-8 flex-wrap">
                    {
                        onlineFriends.map(peer => {
                            const profilePic = peer.profile_picture ? peer.profile_picture : profilePhoto;
                            return <User photo={profilePic} key={peer.id} id={peer.id} name={peer.username} status={"online"} />
                        })
                    }

                    { (!loading && onlineFriends.length === 0) && (
                        <p className="text-lg flex items-center justify-center p-3 pl-0">No friends online!</p>
                    ) }
                </div>
                { loading && <Spinner />}


                <div className="">
                    <h1 className="font-extrabold text-3xl pt-10 mb-4">Offline friends</h1>
                    <div className="flex gap-8 flex-wrap">
                        {
                            offlineFriends.map(peer => {
                                const profilePic = peer.profile_picture ? peer.profile_picture : profilePhoto;
                                return <User photo={profilePic} key={peer.id} id={peer.id} name={peer.username} status={"offline"} />
                            })
                        }
                        { (!loading && offlineFriends.length === 0) && (
                            <p className="text-lg flex items-center justify-center p-3 pl-0">None of your friends are offline :(</p>
                        ) }
                    </div>
                    { loading && <Spinner />}

                </div>
            </div>
        </section>
        </>
    )
}

export default Online;
