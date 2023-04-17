import React from "react";

function ButtonSmall({text, variant="primary", onClick = null, children=null, disabled=false}) {
    let buttonClass = "";
    switch (variant) {
        case "primary":
            buttonClass = "bg-primary";
            break;

        case "cancel":
            buttonClass = "bg-gray-500";
            break;

        case "danger":
            buttonClass = "bg-danger";
            break;

        case "success":
            buttonClass = "bg-green-500";
            break;
        case "pending":
            buttonClass = "bg-yellow-400";
            break;
    }
    return (
        <>
            <button type="button" onClick={onClick} disabled={disabled}
                className={`py-2.5 px-6 bg-danger text-white font-semibold drop-shadow-md rounded 
                                                active:drop-shadow-none ${buttonClass} ${disabled ? "opacity-40" : ""}`}>
                {!children ? (
                    text
                ): (
                    children
                )}
            </button>
        </>
    )
}

export default ButtonSmall;
