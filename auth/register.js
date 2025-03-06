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