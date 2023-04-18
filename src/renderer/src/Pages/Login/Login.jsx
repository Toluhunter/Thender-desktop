import React, { useRef, useState } from 'react';
import Logo from "../../../public/icon/logo.svg";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS } from "../../Routes/url";
import Input from "./../../Components/Input/Input";
import Error from "./../../Components/Input/Error";
import Label from "./../../Components/Input/Label";
import Message from '../../Components/Message/Message';

function Login() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const { postData, setAccessToken, setRefreshToken, setLoggedIn } = useAuth();
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState("normal");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleName = (e) => {
    if (nameRef.current.value.trim() === "") {
      setNameError(() => "Username is required");
    } else {
      setNameError(() => "");
    }
  }

  const handlePassword = (e) => {
    if (passwordRef.current.value.trim() === "") {
      setPasswordError(() => "Password is required");
    } else {
      setPasswordError(() => "");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(() => "loading");
    setSuccess(() => false);
    let bug = false;

    if (passwordRef.current.value.trim() === "") {
      passwordRef.current.focus();
      setPasswordError(() => "Password is required");
      bug = true;
    } else {
      setPasswordError(() => "");
    }

    if (nameRef.current.value.trim() === "") {
      nameRef.current.focus();
      setNameError(() => "Username is required");
      bug = true;
    } else {
      setNameError(() => "");
    }

    if (bug) { // Check for any error
      setStatus(() => "normal");
      return;
    }

    const data = {
      username: nameRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    }

    try {
      // Send request and await response
      const response = await postData(data, PATHS.login);

      if (response.status === 200) { // Successfully created
        setSuccess(() => true);
        setMessage(() => "Login successful!");

        setStatus(() => "normal");
        nameRef.current.value = "";
        passwordRef.current.value = "";

        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;

        // Storing token
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        setAccessToken(() => accessToken);
        setRefreshToken(() => refreshToken);

        // Set LoggedIn state
        setLoggedIn(() => true);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          redirect("/dashboard", { replace: true });
        }, 2000);
      }
    } catch (error) {
      setError(() => `Invalid username or password`)
    }

    setStatus(() => "normal");
  }

  return (
    <>
      <section className="container mx-auto" >
        <div className="flex items-center flex-col py-20 px-6 md:px-0" >
          <Link to="/">
            <img src={Logo} className="w-32 h-32 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Thender Logo" />
          </Link>

          <div className="border rounded mt-10 py-10 px-10 shadow-md max-w-lg w-full">
            <h1 className="font-extrabold text-4xl mb-8 text-center sm:text-[40px]">Welcome back!</h1>

            <form onSubmit={handleSubmit} id="login-form" method="post">
              {
                /** Error message */
                error && (
                  <Message type="error" message={error} status={true} />
                )
              }
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username" text="Username" />
                <div>
                  <Input type="text" disabled={status === "loading"} placeholder="Username" name="username" id="username" reff={nameRef} handleChange={handleName} error={nameError !== ""} />
                  <Error active={nameError} text={nameError} />
                </div>
              </div>

              <div className="flex flex-col space-y-2 mt-4">
                <Label htmlFor="password" text="Password" />
                <div>
                  <Input type="password" disabled={status === "loading"} placeholder="Password" name="password" id="password" reff={passwordRef} handleChange={handlePassword} error={passwordError !== ""} />
                  <Error active={passwordError} text={passwordError} />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button type="submit" disabled={status === "loading"}
                  className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                            text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                            active:drop-shadow-none hover:bg-primaryLight">
                  <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Logging in...." : "Login"}</span>
                </button>
              </div>
            </form>
            <p className="text-gray-500 text-lg mt-4 text-center">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-primaryLight underline hover:no-underline">Register</Link>
              <span> or use </span>
              <Link to="/offline" className="text-primaryLight underline hover:no-underline">offline mode</Link>
            </p>
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
  )
}

export default Login;
