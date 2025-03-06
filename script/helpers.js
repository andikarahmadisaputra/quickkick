function isAuthenticated() {
    return localStorage.getItem("authToken") !== null || sessionStorage.getItem("authToken") !== null;
}

function getUserRole() {
    return localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
}

// Pastikan data user ada di localStorage, jika tidak, masukkan data dummy
if (!localStorage.getItem("users_storage")) {
    localStorage.setItem("users_storage", JSON.stringify(data_users));
}

// Fungsi login
function login(username, password, rememberMe) {
    const users = JSON.parse(localStorage.getItem("users_storage")); // Ambil data dari localStorage
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = `${user.username}-token`; // Simulasi token unik

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


function handleLogin(event) {
    event.preventDefault(); // Mencegah refresh halaman

    console.log("Login button clicked!"); // Debugging

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember").checked;

    console.log(`Username: ${username}, Password: ${password}, Remember: ${rememberMe}`); // Debugging

    login(username, password, rememberMe);
}
// Fungsi logout
function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userRole");
    window.location.href = "/login.html";
}

document.getElementById("register-confirm-password").addEventListener("input", function () {
    const password = document.getElementById("register-password").value;
    const confirmPassword = this.value;
    const errorMessage = document.getElementById("password-error");

    if (password !== confirmPassword) {
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
    }
});

document.getElementById("register-btn").addEventListener("click", function () {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;
    const phone = document.getElementById("register-phone").value;
    const errorMessage = document.getElementById("password-error");

    if (!username || !password || !confirmPassword || !phone) {
        alert("Semua kolom harus diisi!");
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.style.display = "block";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users_storage")) || [];

    if (users.some(user => user.username === username)) {
        alert("Username sudah digunakan, pilih username lain!");
        return;
    }

    users.push({ username, password, phone, role: "member" });
    localStorage.setItem("users_storage", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "/auth/login.html";
});
