import React from "react";
import { useRouterError } from "react-router-dom";

function ErrorPage() {
    const error = useRouterError();

    return (
        <>
            {error.message}
            {error.statusText}
        </>
    );
}

export default ErrorPage;
