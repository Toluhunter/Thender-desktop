import React, { useEffect, useRef, useState } from 'react';
import download from "../../../public/icon/download.svg";
import infoIcon from "../../../public/icon/info.png";
import Machine, { Avatar, Device } from "../../Components/Card/Machine";
import Input from "./../../Components/Input/Input";
import Error from "./../../Components/Input/Error";
import Label from "./../../Components/Input/Label";
import Message from '../../Components/Message/Message';
import ButtonSmall from '../../Components/Button/ButtonSmall';
import Spinner from "../../Components/Spinner/Spinner";
import { server } from 'websocket';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function OfflineConnect({ handleConnect, handleSocket, server }) {
  /** Component that shows in a bid to connect uses together */

  useEffect(() => {

    console.log(server);
    server.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
    server.on('connection', (socket) => {
      handleSocket(socket);
      handleConnect()
    })
    // setTimeout(() => {
    //   handleConnect();
    // }, 5000);

  }, [])

  return (
    <section className="w-full" id="connected-peers">
      <div className="w-full p-12 pb-0">
        <div className="flex items-center flex-col justify-center gap-16">
          <div className="flex flex-col w-full items-center gap-8 lg:w-1/2">
            <Avatar username={api.hostname()} description={"(This device)"} />
            <Device deviceType={"Windows 10"} ip={api.ipAddress()} />
          </div>

          <div className="flex items-center space-x-4">
            <Spinner />
            <span className="text-lg">Awating connection...</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfflineReceive({ handleConnect }) {
  const ipRef = useRef();
  const [ipError, setIPError] = useState("");
  const [status, setStatus] = useState("normal");
  const [error, setError] = useState("");
  const ipAddressRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const handleIP = (e) => {
    if (ipRef.current.value.trim() === "") {
      setIPError(() => "IP Address is required");
    } else if (ipAddressRegex.test(ipRef.current.value) === false) {
      setIPError(() => "Invalid ip address");
    } else {
      setIPError(() => "");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(() => "loading");
    let bug = false;

    if (ipRef.current.value.trim() === "") {
      ipRef.current.focus();
      setIPError(() => "IP Address is required");
      bug = true;
    } else {
      setIPError(() => "");
    }

    if (bug) { // Check for any error
      setStatus(() => "normal");
      return;
    }

    // If no error connect to the socket
    try {
      // Check if user exists if so then connect
      setTimeout(() => {
        setStatus("normal");
        handleConnect();
      }, 5000);
    } catch (error) {
      // Catch Error
    }
  }

  return (
    <div className="flex items-center justify-center">
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
  )
}

async function handleFileDialog() {
  let fileName = await api.fileDialog()
  return fileName
}
function OfflineTransfer({ status, socket, handleStatus, handleDisconnect, userType = "send", server }) {
  /** Component that shows after a connection has been established */
  const [guestHost, setGuestHost] = useState(null);
  server.on('data', (data) => setGuestHost(() => data.toString()))

  const handleSend = async () => {
    let filename = await handleFileDialog();
    // let filename = "/home/toluhunter/Downloads/test.pdf"
    if (!filename) {
      console.log("Didnt get filename")
      return
    }

    console.log(socket)
    socket.write(filename);
    await sleep(800)

    const file = api.createReadStream(filename);

    // send the file to the client
    file.pipe(socket);
    handleStatus("sending");
  }
  return (
    <>
      <section className="w-full" id="connected-peers">
        <div className="w-full p-12 pb-0">
          <div className="flex items-center flex-col-reverse justify-between gap-16 lg:flex-row">
            <div className="flex flex-col w-full items-center gap-8 lg:w-1/2">
              <Machine username={api.hostname()} description={"(This device)"} deviceType={"Windows 10"} ip={api.ipAddress()} />
              <Machine username={guestHost} description={"(Receiver)"} deviceType={"Iphone 16"} ip={"192.168.0.204"} />
              <button
                type="button" onClick={handleDisconnect}
                className="bg-danger text-lg font-semibold text-white px-6 py-4 rounded-md hover:bg-red-600 drop-shadow-md focus:bg-red-600 active:drop-shadow-none">Disconnect</button>
            </div>

            {(userType === "send" && status === "normal") && (
              <form action="#" className="w-full lg:w-1/2">
                <label htmlFor="file" className="block">
                  <div className="bg-zinc-100 p-4 shadow-md">
                    <div className="flex flex-col items-center justify-center px-10 py-24 space-y-5
                              border-2 border-dashed border-zinc-500">
                      <img src={download} className="w-15 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Download icon" />
                      <button onClick={handleSend}><p className="text-lg font-medium text-center"><span className="font-bold">Choose a file </span><span className="font-bold">or drag it here</span></p></button>
                    </div>
                  </div>
                </label>
              </form>
            )}

            {(userType === "receive" && status === "normal") && (
              <div className="w-1/2 flex justify-center items-center space-x-4">
                <Spinner />
                <span className="text-lg">Awaiting file transfer...</span>
              </div>
            )}
          </div>

          {(status === "sending") && (
            <div className="bg-white py-8 px-8 text-lg mt-5 shadow-md flex flex-col rounded-md relative">
              <div className="flex justify-between">
                <div className="flex shrink-0 items-center space-x-10">
                  <div className="space-y-2">
                    <p className="font-bold underline">{"Me"} {"->"} {"You"}</p>
                    <p className="font-bold">File name: <span className="font-light text-gray-700">{"fileName"}</span></p>
                    <p className="font-bold">File Size: <span className="font-light text-gray-700">{"fileSize"}</span></p>
                    <p className="font-bold">Sent: <span className="font-light text-gray-700">{"sent"} Bytes</span></p>
                  </div>
                </div>

              </div>

              <div className="w-full mt-3 h-3 overflow-hidden rounded-full">
                <div class="h-3 w-full bg-neutral-400">
                  <div class="h-3 bg-primary" style={{ width: "45%" }}></div>
                </div>
              </div>
              {userType === "send" && (
                <div className="flex self-end justify-end space-x-4 mt-5">
                  <ButtonSmall text="Cancel" variant="danger" />
                  {status === "sending" ? (
                    <ButtonSmall text="Pause" variant="pending" />
                  ) : (
                    <ButtonSmall text="Resume" variant="success" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Offline() {
  const [connected, setConnected] = useState(false);
  const [choice, setChoice] = useState(null); // User type (sender or receiver)
  const [status, setStatus] = useState("normal");
  const server = api.createServer();
  const [socket, setSocket] = useState(null);

  const handleSocket = (socket) => {
    setSocket(() => socket);
  }

  useEffect(() => {
    const choice = localStorage.getItem("choice") ?? null;
    const connected = localStorage.getItem("connected") ?? false;
    const status = localStorage.getItem("status") ?? "normal";

    // Set state to persist connection
    setChoice(() => choice);
    setConnected(() => connected);
    setStatus(() => status)
  }, []);

  const handleConnect = () => {
    /** Checks if a sender or receiver is connected to a web socket */
    localStorage.setItem("choice", choice);
    localStorage.setItem("connected", true);
    setConnected(true);
  }

  const handleStatus = (status) => {
    /** Handles the status of the users transaction */
    localStorage.setItem("status", status)
    setStatus(() => status);
  }

  const disconnect = () => {
    /** Take user to base screen */
    localStorage.setItem("choice", null);
    localStorage.setItem("connected", false);
    localStorage.setItem("status", "normal");

    // Set state to persist connection
    setChoice(() => null);
    setConnected(() => false);
    setStatus(() => "normal");
    console.log("Disconnected bro")
    server.close()
  }

  return (
    <>
      {(choice === null || choice === "null") && (
        <>
          <div className="flex items-center h-56 space-x-6 justify-center">
            <ButtonSmall text="Receive" variant="cancel" onClick={() => setChoice(() => "receive")} />
            <ButtonSmall text="Send" variant="success" onClick={() => {
              setChoice(() => "send")

            }} />
          </div>
        </>
      )}

      {choice && (
        <>
          {/* Sender section */}
          {choice === "send" && (
            <>
              {(connected === false || connected === 'false') ? (
                <OfflineConnect handleSocket={handleSocket} handleConnect={handleConnect} server={server} />
              ) : (
                <OfflineTransfer socket={socket} status={status} userType={choice} handleStatus={handleStatus} handleDisconnect={disconnect} server={server} />
              )}
            </>
          )}

          {/* receiver section */}
          {choice === "receive" && (
            <>
              {(connected === false || connected === 'false') ? (
                <OfflineReceive handleConnect={handleConnect} />
              ) : (
                <OfflineTransfer socket={socket} status={status} userType={choice} handleStatus={handleStatus} handleDisconnect={disconnect} server={server} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Offline;
