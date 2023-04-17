import React, { useRef } from "react";
import profilePhoto from "../../../public/img/avatar.svg";
import SearchInput from "../../Components/Input/SearchInput";

function Header() {
  const searchRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    return;
  }

  return (
    <header className="z-40 bg-white border-b border-gray-200 shadow-md right-0 w-full fixed">
      <nav className="">
          <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
              <div className="flex items-center justify-between">
                  <form onSubmit={handleSearch} className="container sm:ml-64 lg:mx-auto w-1/2">   
                      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                      <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                          </div>
                          <SearchInput reff={searchRef} />
                          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:border-blue-600 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                      </div>
                  </form>
                  
                  <div className="flex shrink-0 items-center ml-3">
                      <div className="relative shrink-0">             
                          <img className="w-10 h-10 rounded-full" src={profilePhoto} alt="user photo" />
                          <span className="-top-1 left-5 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                      </div>
                  </div>
              </div>
          </div>
      </nav>  
    </header>
  )
}

export default Header;
