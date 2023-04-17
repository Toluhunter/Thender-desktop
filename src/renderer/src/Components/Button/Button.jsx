import React from "react";

function Button({type, status, text, loadingText}) {
    return (
        <button type={type} disabled={status === "loading"}
            className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                active:drop-shadow-none hover:bg-primaryLight">
            <span className={`text-lg sm:text-xl`}>{status === "loading" ? loadingText : text}</span>
        </button>
    )
}

export default Button;
