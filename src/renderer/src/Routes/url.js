/** BASE URL FOR BACKEND API */
const baseURL = "https://thender.onrender.com";
const socketBaseURL = "wss://thender.onrender.com/";

const PATHS = {
    // Authentication
    register: "/account/signup/",
    login: "/account/login/",
    details: "/account/profile/",
    logout: "/account/logout/",
    changePassword: "/account/change-password/",

    // Tokens
    refreshToken: "/token/refresh/",
    checkToken: "/token/check/",

    // Peers
    makePeerRequest: "/peer/request/",
    fetchPeerRequest: "/peer/requests/?type=recieved",
    handlePeerRequest: "/peer/handle-requests/",
    retrievePeers: "/peer/all/",

    // Search
    searchUsers: "/search/?q=",
    searchEnd: "&p=1&s=25",

    // Transmisson
    addTransmission: "/transmission/add/",
    listTransmission: "/transmission/all/",
    pendingTransmission: "/transmission/pending/",
    deleteTransmission: "/delete/",
    acceptTransmission: "/accept/",

    // History
    fetchHistory: "/transmission/history/",
};

export { baseURL, socketBaseURL, PATHS };