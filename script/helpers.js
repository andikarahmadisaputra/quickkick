function isAuthenticated() {
  return (
    localStorage.getItem("authToken") !== null ||
    sessionStorage.getItem("authToken") !== null
  );
}

function getUserRole() {
  return localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
}

// Fungsi login
function login(username, password, rememberMe) {
  const users = JSON.parse(localStorage.getItem("users_storage")); // Ambil data dari localStorage
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

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
      window.location.href = "admin/admin.html";
    } else {
      window.location.href = "member/member.html";
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

  console.log(
    `Username: ${username}, Password: ${password}, Remember: ${rememberMe}`
  ); // Debugging

  login(username, password, rememberMe);
}
// Fungsi logout
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userRole");
  window.location.href = "auth/login.html";
}
