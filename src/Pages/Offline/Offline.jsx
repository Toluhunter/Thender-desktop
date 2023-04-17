import React, { useRef, useState } from 'react';
import download from "../../../public/icon/download.svg";
import infoIcon from "../../../public/icon/info.png";
import Machine, { Avatar, Device } from "../../Components/Card/Machine";
import Input from "./../../Components/Input/Input";
import Error from "./../../Components/Input/Error";
import Label from "./../../Components/Input/Label";
import Message from '../../Components/Message/Message';

function OfflineConnect({handleConnect}){
  /** Component that shows in a bid to connect uses together */
  const ipRef = useRef();
  const [ipError, setIPError] = useState("");
  const [status, setStatus] = useState("normal");
  const [error, setError] = useState("");

  const handleIP = (e) => {
    if (ipRef.current.value.trim() === "") {
      setIPError(() => "IP Address is required");
    } else {
      setIPError(() => "");
    }
  }

  const handleSubmit = (e) => {
    handleConnect();
    e.preventDefault();
  }

  return (
    <section className="w-full" id="connected-peers">
        <div className="w-full p-12 pb-0">
            <div className="flex items-center flex-col-reverse justify-between gap-16 lg:flex-row">
              <div className="flex flex-col w-full items-center gap-8 lg:w-1/2">
                <Avatar  username={"Toluhunter"} description={"(This device)"} />
                <Device  deviceType={"Windows 10"} ip={"192.168.0.204"} />
              </div>

              <div className="w-full lg:w-1/2 pt-16">
                <Avatar username={""} description={"(Other Device)"} />
                <form onSubmit={handleSubmit} id="login-form" method="post" className="mt-5" >
                    {
                      /** Error message */
                      error && (
                          <Message type="error" message={error} status={true} />
                      )
                    }
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="username" text="Enter the ip address you want to connect: " />
                      <div>
                        <Input type="text" disabled={status === "loading"} placeholder="IP Address" name="ipaddress" id="ipaddress" reff={ipRef} handleChange={handleIP} error={ipError !== ""} />
                        <Error active={ipError} text={ipError} />
                        <div className="flex space-x-2 mt-3">
                          <img src={infoIcon} className="w-4 h-4" alt="Info icon" />
                          <p className="font-light text-gray-400 text-sm">You can view the ip address by checking the interface settings, e.g ifconfig on linux</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button type="submit" disabled={status === "loading"}
                          className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                            text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                            active:drop-shadow-none hover:bg-primaryLight">
                        <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Connecting...." : "Connect"}</span>
                      </button>
                    </div>
                  </form>
              </div>
          </div>
        </div>
      </section>
  );
}

function OfflineTransfer() {
  /** Component that shows after a connection has been established */
  return (
    <>
      <section className="w-full" id="connected-peers">
        <div className="w-full p-12 pb-0">
            <div className="flex items-center flex-col-reverse justify-between gap-16 lg:flex-row">
              <div className="flex flex-col w-full items-center gap-8 lg:w-1/2">
                <Machine username={"Toluhunter"} description={"(This device)"} deviceType={"Windows 10"} ip={"192.168.0.1"} />
                <Machine username={"Samuel"} description={"(Receiver)"} deviceType={"Iphone 16"} ip={"192.168.0.204"} />
                <button
                  type="button"
                  className="bg-danger text-lg font-semibold text-white px-6 py-4 rounded-md hover:bg-red-600 drop-shadow-md focus:bg-red-600 active:drop-shadow-none">Disconnect</button>
              </div>
              <form action="#" className="w-full lg:w-1/2">
                <label htmlFfor="file" className="block cursor-pointer">
                    <div className="bg-zinc-100 p-4 shadow-md">
                        <div className="flex flex-col items-center justify-center px-10 py-24 space-y-5
                              border-2 border-dashed border-zinc-500">
                            <img src={download} className="w-15 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Download icon" />
                            <p className="text-lg font-medium text-center"><span className="font-bold">Choose a file </span><span className="font-bold">or drag it here</span></p>
                        </div>
                    </div>
                </label>
                <input type="file" name="file" id="file" className="hidden" />
              </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Offline() {
  const [connected, setConnected] = useState(false);
  const handleConnect = () => {
    setConnected(true);
  }

  return (
    <>
      {!connected ? (
        <OfflineConnect handleConnect={handleConnect} />
      ): (
        <OfflineTransfer />
      )}
    </>
  );
}

export default Offline;
