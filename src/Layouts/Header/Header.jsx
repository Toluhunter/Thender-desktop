import React, { useEffect, useRef, useState } from "react";
import profilePhoto from "../../../public/img/avatar.svg";
import SearchInput from "../../Components/Input/SearchInput";
import UserSearch from "../../Components/Card/UserSearch";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS } from "../../Routes/url";
import Spinner from "../../Components/Spinner/Spinner";


function Header() {
  const searchRef = useRef();
  const { getWithToken, postWithToken, accessToken, loggedIn } = useAuth();
  const [searchError, setSearchError] = useState("");
  const [status, setStatus] = useState("blank");
  const [searchData, setSearchData] = useState([]);
  const [resultShow, setResultShow] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);
  const [disabledAdd, setDisabledAdd] = useState([]);
  const popupRef = useRef();

  useEffect(() => {
    /** Ref that closes the search popup */
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setResultShow(() => false); // Close search popup
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [popupRef]);


  const handleSearchField = (e) => {
    if (searchRef.current.value.trim() === "") {
      setSearchError(() => "Field is required");
    } else {
      setSearchError(() => "");
      setStatus(() => "normal")
    }
  }

  const handleSearch = async (e) => {
    /** Handles searching for other users */
    e.preventDefault();
    setStatus(() => "searching");
    let bug = false;
    
    if (searchRef.current.value.trim() === "") {
      searchRef.current.focus();
      setSearchError(() => "Field is required");
      bug = true;
    } else {
      setSearchError(() => "");
    }
    
    if (bug) { // Check for any error
      setStatus(() => "normal");
      return;
    }
    
    const data = searchRef.current.value.trim();
    setResultShow(() => true);

    try {
      // Send request and await response
      const response = await getWithToken(`${PATHS.searchUsers}${data}${PATHS.searchEnd}`, accessToken);

      if (response.status === 200) { // Successfully created
        setSearchData(() => response.data.results);
      }
    } catch(error) {
        setSearchError(() => `An error occured`)  
    }

    setStatus(() => "normal");
  }

  const handleAdd = async (id) => {
    /** Handles sending peer requests to other users */
    // Send request to server
    setDisabledAdd(prev => [...prev, id]);

    const data = {
      user: id
    }
    
    try {
      // Send request and await response
      const response = await postWithToken(data, PATHS.makePeerRequest, accessToken);
      
      if (response.status === 201) { // Successfully created
        setAddedUsers(prev => [...prev, id]);
      }
    } catch(error) {
      setAddedUsers(prev => [...prev, id]); // Handled 400 already added request
    }

    // Remove user from disabled users (Add button)
    setDisabledAdd(prev => {
      return prev.filter(userID => userID !== id)
    });
  }

  return (
    <header className={`z-40 bg-white border-b border-gray-200 shadow-md right-0 w-full fixed ${!loggedIn ? "h-16" : ""}`}>
      <nav className="">
          <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
            {
              loggedIn && (
                <div className="flex items-center justify-between">
                    <form onSubmit={handleSearch} className="container sm:ml-64 lg:mx-auto w-1/2">   
                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <SearchInput reff={searchRef} disabled={status === "searching"} onChange={handleSearchField} />
                            <button type="submit" className={`text-white absolute right-2.5 bottom-2.5 bg-blue-700 focus:ring-4 focus:border-blue-600 focus:outline-none 
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ${status === "searching" ? "opacity-40" : "hover:bg-blue-800"}`} disabled={status === "searching" || status === "blank"}>
                              Search
                            </button>
                            {
                              resultShow && (
                                <div ref={popupRef} className="absolute top-[110%] shadow-md w-full p-5 rounded-md bg-white space-y-6">
                                  {
                                    status === "searching" ? (
                                      <Spinner />
                                    ) : (
                                      searchData.length === 0 ? (
                                        <p>No user found.</p>
                                      ) : (
                                        searchData.map(user => {
                                            return <UserSearch image={user.profile_picture} added={addedUsers.includes(user.id)} id={user.id} 
                                                      key={user.id} disabled={disabledAdd.includes(user.id)} username={user.username} handleAdd={() => handleAdd(user.id)} />
                                        })
                                      )
                                    )
                                  }
                                </div>
                              )
                            }
                        </div>
                    </form>
                    
                    <div className="flex shrink-0 items-center ml-3">
                        <div className="relative shrink-0">             
                            <img className="w-10 h-10 rounded-full" src={profilePhoto} alt="user photo" />
                            <span className="-top-1 left-5 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                        </div>
                    </div>
                </div>
              )
            }
          </div>
      </nav>  
    </header>
  )
}

export default Header;
