function isAuthenticated() {
    return localStorage.getItem("authToken") !== null || sessionStorage.getItem("authToken") !== null;
}

function getUserRole() {
    return localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
}

export { isAuthenticated, getUserRole };
