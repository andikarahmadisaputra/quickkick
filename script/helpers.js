function isAuthenticated() {
    return localStorage.getItem("authToken") !== null || sessionStorage.getItem("authToken") !== null;
}

function getUserRole() {
    return localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
}

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
            
        if (user.role === "admin") {
            window.location.href = "/admin/admin.html";
        } else {
            window.location.href = "/member/member.html";
        }
    } else {
        alert("Login gagal! Username atau password salah.");
    }
}

function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userRole");

    window.location.href = "index.html";
}