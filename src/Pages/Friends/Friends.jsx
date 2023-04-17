import React from "react";
import profilePhoto from "../../../public/img/avatar.svg";
import FriendRequest from "../../Components/Card/FriendRequest";

function Friends() {
  return (
    <>
      <section className="container mx-auto">
        <div className="">
          <h1 className="font-extrabold text-3xl pt-10 mb-4">Friend Requests</h1>

          <div className="mt-8 space-y-6">
            <FriendRequest image={profilePhoto} fullName={"Beatrice Patrick"} username={"Beatrice"} email={"beapatrick@gmail.com"} />
            <FriendRequest image={profilePhoto} fullName={"Beatrice Patrick"} username={"Beatrice"} email={"beapatrick@gmail.com"} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Friends;
