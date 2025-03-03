import { login } from "../auth/login.js";

export function LoginPage() {
    setTimeout(() => {
        document.getElementById("login-btn").addEventListener("click", () => {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const rememberMe = document.getElementById("rememberMe").checked;
            login(username, password, rememberMe);
        });
    }, 0);

    return `
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="card p-4 shadow" style="max-width: 400px; width: 100%;">
                <h3 class="text-center fw-bold">Login</h3>
                <p class="text-center text-muted">Masuk untuk melanjutkan</p>

                <form>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" placeholder="Masukkan username" required>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Kata Sandi</label>
                        <input type="password" class="form-control" id="password" placeholder="Masukkan kata sandi" required>
                    </div>

                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">Ingat saya</label>
                    </div>

                    <button id="login-btn" type="button" class="btn btn-primary w-100">Login</button>

                </form>
            </div>
        </div>
    `;
}
