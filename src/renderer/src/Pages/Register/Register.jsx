import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../public/icon/logo.svg";
import Input from "./../../Components/Input/Input";
import Error from "./../../Components/Input/Error";
import Label from "./../../Components/Input/Label";
import Button from "./../../Components/Button/Button";
import Message from '../../Components/Message/Message';
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS  } from "../../Routes/url";

function Tick() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"
            className="w-6 h-6 text-blue-600 font-bold mr-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

function CheckText({text}) {
    return (
        <>
            <Tick />
            <p className="font-medium">{text}</p>
        </>
    );
}

function Register() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const { postData, setToken, setLoggedIn } = useAuth();
    const navigate = useNavigate();
  
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
  
    const [status, setStatus] = useState("normal");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
  
    const handleBlankInput = (objRef, setErrorObj, errorMessage) => {
      /**
       * objRef: Used to check the inputs value
       * setErrorObj: Used to set the error state of the input
       * errorMessage: Error message to set in state
       */
      if (objRef.current.value.trim() === "") {
        setErrorObj(() => errorMessage);
      } else {
        setErrorObj(() => "");
      }
    }
  
    const handleEmail = (e) => {
      /**
       * Handling email validity
       */
      const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      
      if (emailRef.current.value.trim() === "") {
        setEmailError(() => "Email is required");
      } else if (emailRegex.test(emailRef.current.value) === false) {
        setEmailError(() => "Invalid email address");
      } else {
        setEmailError(() => "");
      }
    };
  
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
  
      if (emailRef.current.value.trim() === "") {
        emailRef.current.focus();
        setEmailError(() => "Email is required");
        bug = true;
      } else {
        setEmailError(() => "");
      }
  
      if (lastNameRef.current.value.trim() === "") {
        lastNameRef.current.focus();
        setLastNameError(() => "Last name is required");
        bug = true;
      } else {
        setLastNameError(() => "");
      }
  
      if (firstNameRef.current.value.trim() === "") {
        firstNameRef.current.focus();
        setFirstNameError(() => "First name is required");
        bug = true;
      } else {
        setFirstNameError(() => "");
      }
  
      if (bug) { // Check for any error
        setStatus(() => "normal");
        return;
      }
  
      const data = {
        username: nameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        first_name: firstNameRef.current.value.trim(),
        last_name: lastNameRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
      }
  
      try {
        // Send request and await response
        const response = await postData(data, PATHS.register);
  
        if (response.status === 201) { // Successfully created
          setMessage("Account created successfully!");
          setSuccess(() => true);
  
          setStatus(() => "normal");
          nameRef.current.value = "";
          firstNameRef.current.value = "";
          lastNameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
  
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch(error) {
          const errors = error?.response?.data;
          if (errors?.email) {
              setEmailError(errors?.email[0]);
          }
          if (errors?.username) {
              setNameError(errors?.username[0]);
          }
  
          if (errors?.first_name) {
              setFirstNameError(errors?.first_name[0]);
          }
  
          if (errors?.last_name) {
              setLastNameError(errors?.last_name[0]);
          }
          setError(() => `${error?.response?.statusText}!`);  
      }
  
      setStatus(() => "normal");
    }
  return (
      <>
        <section className="container mx-auto w-full">
            <div className="flex justify-center md:space-x-32 py-20 px-6 lg:px-40">
                <div className="w-1/2 self-stretch hidden md:block">
                    <div className="sticky top-10">
                        <Link to="/">
                            <img src={Logo} className="w-44 h-44 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Thender Logo" />
                        </Link>
                        <p className="font-extrabold mt-20 mb-6">FEATURES WE OFFER</p>
                        <div className="flex">
                            <CheckText text="Send files across devices" />
                        </div>

                        <div className="flex mt-4">
                            <CheckText text="Resume file download anytime" />
                        </div>

                        <div className="flex mt-4">
                            <CheckText text="Add friends and accept file requests" />
                        </div>

                        <div className="flex mt-4">
                            <CheckText text="Send file to groups" />
                        </div>
                    </div>
                </div>
                
                <div className="w-full md:w-1/2">
                    <Link to="/" className="block flex justify-center md:hidden">
                        <img src={Logo} className="mb-10 w-44 h-44 shrink-0 color-transparent object-cover indent-[100%] block overflow-hidden whitespace-nowrap" alt="Thender Logo" />
                    </Link>
                    <h1 className="font-extrabold text-4xl mb-8 sm:text-[40px] text-center md:text-left">Create your account</h1>
                    <form onSubmit={handleSubmit} id="signup-form" method="post">
                        {
                        /** Error message */
                        error && (
                            <Message type="error" message={error} status={true} />
                        )
                        }
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="firstname" text="First name" />
                            <div>
                                <Input type="text" disabled={status === "loading"} placeholder="First name" name="firstname" id="firstname" reff={firstNameRef} handleChange={() => handleBlankInput(firstNameRef, setFirstNameError, "First name is required")} error={firstNameError !== ""} />
                                <Error active={firstNameError} text={firstNameError} />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <Label htmlFor="lastname" text="Last name" />
                            <div>
                                <Input type="text" disabled={status === "loading"} placeholder="Last name" name="lastname" id="lastname" reff={lastNameRef} handleChange={() => handleBlankInput(lastNameRef, setLastNameError, "Last name is required")} error={lastNameError !== ""} />
                                <Error active={lastNameError} text={lastNameError} />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <Label htmlFor="email" text="Email" />
                            <div>
                                <Input type="text" disabled={status === "loading"} placeholder="Email" name="email" id="email" reff={emailRef} handleChange={handleEmail} error={emailError !== ""} />
                                <Error active={emailError} text={emailError} />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <Label htmlFor="username" text="Username" />
                            <div>
                                <Input type="text" disabled={status === "loading"} placeholder="Username" name="username" id="username" reff={nameRef} handleChange={() => handleBlankInput(nameRef, setNameError, "Name is required")} error={nameError !== ""} />
                                <Error active={nameError} text={nameError} />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 mt-4">
                            <Label htmlFor="password" text="Password" />
                            <div>
                                <Input type="password" disabled={status === "loading"} placeholder="Password" name="password" id="password" reff={passwordRef} handleChange={() => handleBlankInput(passwordRef, setPasswordError, "Password is required")} error={passwordError !== ""} />
                                <Error active={passwordError} text={passwordError} />
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Button type="submit" status={status} text="Register" loadingText="Registering...." />
                        </div>
                    </form>
                    <p className="text-gray-500 text-lg mt-4 text-center">
                        <span>Already have an account? </span> 
                        <Link to="/login" className="text-primaryLight underline hover:no-underline">Login</Link>
                        <span> or use </span> 
                        <Link to="#" className="text-primaryLight underline hover:no-underline">offline mode</Link>
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

export default Register;
