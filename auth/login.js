import { users } from "../data/users.js";
import { navigateTo } from "../app.js";

function login(username, password, rememberMe) {
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = `${user.username}-token`; // Simulasi token unik

        // Simpan token & role sesuai pilihan "Remember Me"
        if (rememberMe) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", user.role);
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userRole");
        } else {
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userRole", user.role);
            localStorage.removeItem("authToken");
            localStorage.removeItem("userRole");
        }

        // Redirect berdasarkan role
        if (user.role === "admin") {
            navigateTo("/admin");
        } else {
            navigateTo("/member");
        }
    } else {
        alert("Login gagal! Username atau password salah.");
    }
}

export { login };
