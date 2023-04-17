import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import { baseURL, PATHS } from "../../Routes/url";
import axios from "axios";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const client = axios.create({baseURL: baseURL});
    const checkTokenRef = useRef(checkToken);
    const postDataRef = useRef(postData);

    useEffect(() => {
        const getData = async () => {
            const accessToken = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");

            if (accessToken) {
                try {
                    await checkTokenRef.current(accessToken);
                    setLoggedIn(() => true); // Log user in
                    setTokens(accessToken, refreshToken); // Set tokens
                } catch(error) {
                    if (error.code !== "ERR_NETWORK") { // Only perform when there is network
                        if (refreshToken) {
                            const data = {
                                "refresh": refreshToken
                            };
                            try { // refresh access token
                                const detail = await postDataRef.current(data, PATHS.refreshToken);
                                setAccessToken(detail.data.access); // Setting access token
                                setLoggedIn(() => true); // Log user in
                                setTokens(accessToken, refreshToken); // Set tokens
                            } catch(error) {
                                baseLogout(); // Logout user
                            }

                        } else {
                            baseLogout(); // Logout user if 
                        }
                    }
                }
            }

            setLoading(false);
        }

        getData();
    }, [accessToken]);

    function setTokens(accessToken, refreshToken) {
        setAccessToken(() => accessToken);
        setRefreshToken(() => refreshToken);
    }

    function baseLogout() {
        /** BASE LOGOUT */
        setLoggedIn(() => false);
        setRefreshToken(() => "");
        setAccessToken(() => "");
        setUser(() => null);
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
    }

    async function logout() {
        /** Logs out a logged in user */
        const refreshToken = localStorage.getItem("refresh_token");
        
        if (refreshToken) {
            const data = {
                refresh: refreshToken
            }

            try {
                const detail = await postData(data, PATHS.logout);
                baseLogout(); // Log user out
            } catch(error) {
                baseLogout(); // Log user out
            }
        } else {
            baseLogout(); // Log user out
        }
    }

    async function checkToken(token) {
        const result = await client.get(
            PATHS.checkToken,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        )

        return result.data;
    }

    async function getUserDetails(token) {
        const result = await client.get(
            PATHS.details,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        )

        return result.data;
    }

    async function getWithToken(url, token) {
        return await client.get(
            url,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        );
    }

    async function postData(data, url) {
        return await client.post(url, data);
    }

    async function postWithToken(data, url, token) {
        return await client.post(
            url, data,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        );
    }

    async function patchWithToken(data, url, token) {
        return await client.patch(
            url, data,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        );
    }

    async function putWithToken(data, url, token) {
        return await client.put(
            url, data,
            {
                headers: { 'Authorization': `Bearer ${token}`}
            }
        );
    }

    const value = {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        checkToken,

        user,

        getUserDetails,
        
        getWithToken,
        postData,
        postWithToken,
        patchWithToken,
        putWithToken,

        loggedIn,
        setLoggedIn,
        logout,
        baseLogout
    };

    const spinner = (
        <div className="flex h-screen items-center justify-center">
            <div role="status">
                <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

    return (
        <AuthContext.Provider value={value}>
            { !loading ? children : spinner}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export { useAuth };