import React from "react";
import profilePhoto from "../../../public/img/avatar.svg";
import TransferRequest from "../../Components/Card/TransferRequest";

function Transfer() {
  return (
    <>
      <section className="container mx-auto">
        <div className="">
          <h1 className="font-extrabold text-3xl pt-10 mb-4">Transfer Requests</h1>

          <div className="mt-8 space-y-8">
            <TransferRequest image={profilePhoto} fileName={"Randomfile.txt"} username={"Beatrice"} fileSize={"250KB"} type={"online"} />
            <TransferRequest image={profilePhoto} fileName={"Randomfile.txt"} username={"Beatrice"} fileSize={"250KB"} type={"offline"} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Transfer;
