function isAuthenticated() {
    return (
        localStorage.getItem("authToken") !== null ||
        sessionStorage.getItem("authToken") !== null
    );
}

function getUserRole() {
    return (
        localStorage.getItem("userRole") || sessionStorage.getItem("userRole")
    );
}

function login(username, password, rememberMe) {
    console.log("Mencari user...");

    // Ambil data user dari data.js (bawaan)
    let allUsers = data_users || [];

    // Ambil data user dari localStorage (user yang telah register)
    let storedUsers = JSON.parse(localStorage.getItem("users_storage")) || [];

    // Gabungkan kedua sumber data
    allUsers = [...allUsers, ...storedUsers];

    // Cari user berdasarkan username dan password
    const user = allUsers.find(u => u.username === username && u.password === password);

    if (user) {
        const token = `${user.username}-token`;
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

        alert("Login berhasil! Anda akan diarahkan...");
        if (user.role === "admin") {
            window.location.href = "../admin/admin.html";
        } else {
            window.location.href = "../member/member.html";
        }
    } else {
      alert("Login gagal! Username atau password salah.");
    }
  }

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember").checked;

    login(username, password, rememberMe);
}

