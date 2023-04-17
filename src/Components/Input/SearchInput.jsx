import React from "react";

function SearchInput({reff, onChange, disabled}) {
    return (
      <input type="search" ref={reff} id="search" className={`block w-full p-4 pl-10 text-sm font-semibold text-gray-900 border
            shadow-sm rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 ${disabled ? "disabled:opacity-40" : ""}`} 
            placeholder="Search for user" disabled={disabled} onChange={onChange} />
    );
}

export default SearchInput;
