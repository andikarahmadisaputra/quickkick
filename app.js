import { isAuthenticated, getUserRole } from "./auth/auth.js";
import { logout } from "./auth/logout.js";
import { LoginPage } from "./pages/Login.js";
import { Navbar } from "./components/Navbar.js";
import { AdminPage } from "./pages/Admin.js";
import { MemberPage } from "./pages/Member.js";
import { Dashboard } from "./pages/Dashboard.js";

const routes = {
    "/": Dashboard,
    "/login": () => isAuthenticated() ? Dashboard() : LoginPage(),
    "/logout": () => {
        logout();
        return Dashboard();
    },
    "/admin": () => {
        if (!isAuthenticated()) return LoginPage(); 
        return getUserRole() === "admin" ? AdminPage() : Dashboard();
    },
    "/member": () => {
        if (!isAuthenticated()) return LoginPage();
        return getUserRole() === "member" ? MemberPage() : Dashboard();
    }
};

function navigateTo(path) {
    history.pushState({}, "", path);
    renderPage();
}

function renderPage() {
    const path = window.location.pathname;
    const page = routes[path];

    document.getElementById("navbar").innerHTML = Navbar();
    document.getElementById("app").innerHTML = page ? page() : "<h1>404 Not Found</h1>";
}

window.addEventListener("popstate", renderPage);

export { navigateTo, renderPage };
