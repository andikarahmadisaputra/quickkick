import { renderPage, navigateTo } from "./app.js";

// Render halaman pertama kali
document.addEventListener("DOMContentLoaded", renderPage);

// Menangani klik pada link agar tidak reload
document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
        event.preventDefault();
        navigateTo(event.target.getAttribute("href"));
    }
});
