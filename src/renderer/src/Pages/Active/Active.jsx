import React from "react";
import ActiveRequest from "../../Components/Card/ActiveRequest";

function Active() {
  return (
    <>
      <section className="container mx-auto">
        <div className="">
          <h1 className="font-extrabold text-3xl pt-10 mb-4">Active transfers</h1>

          <div className="mt-8 space-y-8">
            <ActiveRequest fileName={"Randomfile.txt"} username={"Beatrice"} to={"Jonathan"} fileSize={"250KB"}
              type={"online"} sent={"1800"} status="sending" />
            <ActiveRequest fileName={"Randomfile.txt"} username={"Beatrice"} to={"Jonathan"} fileSize={"250KB"} 
              type={"offline"} sent={"700"} status="paused" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Active;
