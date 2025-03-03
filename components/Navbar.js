import { isAuthenticated, getUserRole} from "../auth/auth.js";

export function Navbar() {
    const auth = isAuthenticated();
    const role = auth ? getUserRole() : null;

    setTimeout(() => {
        let navbar = document.getElementById("navbar");
    
            function checkScroll() {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            }
    
            window.addEventListener("scroll", checkScroll);
            checkScroll();
    }, 0);

    return `
        <nav id="navbar" class="navbar navbar-expand-lg navbar-dark fixed-top">
            <div class="container">
                <a class="navbar-brand fw-bold" href="#">QuickKick</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="/" data-link>Beranda</a></li>
                        <li class="nav-item"><a class="nav-link" href="#lapangan">Lapangan</a></li>
                        <li class="nav-item"><a class="nav-link" href="#promo">Promo</a></li>
                        <li class="nav-item"><a class="nav-link" href="#testimoni">Testimoni</a></li>
                        <li class="nav-item"><a class="nav-link" href="#faq">FAQ</a></li>
                        <li class="nav-item"><a class="nav-link btn btn-primary text-white px-3" href="#">Booking</a></li>
                    </ul>

                    <ul class="navbar-nav ms-3">
                        ${auth && role === "admin" ? `<li class="nav-item"><a class="nav-link btn btn-outline-light px-3" href="/admin" data-link>Admin</a></li>` : ""}
                        ${auth && role === "member" ? `<li class="nav-item"><a class="nav-link btn btn-outline-light px-3" href="/member" data-link>Member</a></li>` : ""}
                        ${auth 
                            ? `<li class="nav-item ms-2"><a class="nav-link btn btn-danger text-white px-3" href="/logout" data-link>Logout</a></li>` 
                            : `<li class="nav-item"><a class="nav-link btn btn-outline-light px-3" href="/login" data-link>Login</a></li>`
                        }
                    </ul>
                </div>
            </div>
        </nav>

    `;
}