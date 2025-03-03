import { renderPage, navigateTo } from "../app.js";

function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userRole");

    setTimeout(() => {
        navigateTo("/");
    }, 0);
}

export { logout };