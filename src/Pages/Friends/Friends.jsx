import React, { useState, useRef, useEffect } from "react";
import FriendRequest from "../../Components/Card/FriendRequest";
import { PATHS } from "../../Routes/url";
import profilePhoto from "../../../public/img/avatar.svg";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import Spinner from "../../Components/Spinner/Spinner";


function Friends() {
  const [friends, setFriends] = useState([]);
    const { accessToken, getWithToken, postWithToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const postWithRef = useRef(postWithToken);
    const tokenRef = useRef(accessToken);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [reload, setReload] = useState(false);
    const getWithRef = useRef(getWithToken);

    useEffect(() => {
        let ignore = false;
        
        const getData = async () => {
          try {
            // Fetch all friend requests
            const response = await getWithRef.current(PATHS.fetchPeerRequest, tokenRef.current);
            
            if (!ignore) {
              // Set all online peers
              setFriends(response.data.results);
            }

            setLoading(false);
          } catch(error) {
            console.log(error);
            setLoading(false);
          }
    
        }
    
        getData();
    
        return () => {
            ignore = true;
        };
      }, [reload]);

    const handleRequest = async (peerID, type="accept") => {
      /** Handle accept or rejection of request */
      let action = true;
      console.log(peerID);

      switch(type) {
        case "accept":
        action = true;
        break;

        case "reject":
        action = false;
        break;
      }

      try {
        const data = {
          "peer_request": peerID,
          "action": action
        };

        console.log(data);
        
        const response = await postWithRef.current(data, PATHS.handlePeerRequest, tokenRef.current);
        if (response.status === 200) { // Successfully created
            setReload(prev => !prev); // Make request 
            setSuccess(() => true);
            setMessage(() => `${type} successful!`);
        }

        setLoading(false);
      } catch(error) {
      }
    }

  return (
    <>
      <section className="container mx-auto">
        <div className="">
          <h1 className="font-extrabold text-3xl pt-10 mb-4">Friend Requests</h1>

          <div className="mt-8 space-y-6">
            {
              friends.map(friend => {
                const profilePic = friend.sender.profile_picture ? friend.sender.profile_picture : profilePhoto;
                return <FriendRequest image={profilePic} username={friend.sender.username} key={friend.id}
                  handleAccept={() => handleRequest(friend.id, "accept")} handleReject={() => handleRequest(friend.id, "reject")} />
              })
            }
            { loading && <Spinner />}

            {(!loading && friends.length === 0) && (
                <p className="text-lg flex items-center justify-center p-3 pl-0">No friend requests.</p>
            )}
          </div>
        </div>
      </section>

      {
        success && (
          <div className="fixed left-4 bottom-4 flex flex-col space-y-4 z-10">
            <Message type="success" message={message} status={success} />
          </div>
        )
      }
    </>
  );
}

export default Friends;
