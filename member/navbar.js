document.addEventListener("DOMContentLoaded", function () {
    // Navbar untuk member
    const navbarContent = `
        <div class="container">
            <a class="navbar-brand fw-bold" href="member/member.html">QuickKick</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Cek Lapangan</a></li>
                    <li class="nav-item"><a class="nav-link" href="riwayat.html">Riwayat</a></li>
                </ul>
                <ul class="navbar-nav ms-3">
                    <li class="nav-item ms-2"><a class="nav-link btn btn-danger text-white px-3" onclick="logout()">Logout</a></li>
                </ul>
            </div>
        </div>`;
    document.getElementById("navbar").innerHTML = navbarContent;
    document.getElementById("navbar").style.backgroundColor = '#28a745'; // Hijau untuk navbar

    // Footer
    const footerContent = `
        <div class="container">
            <p>Kontak: <a href="mailto:info@quickkick.com" class="text-white">info@quickkick.com</a> | WhatsApp: 08123456789</p>
            <p>Ikuti kami: <a href="#" class="text-white">Instagram</a> | <a href="#" class="text-white">Facebook</a> | <a href="#" class="text-white">Twitter</a></p>
            <p><a href="#" class="text-white">Kebijakan Privasi</a> | <a href="#" class="text-white">Syarat & Ketentuan</a></p>
        </div>`;
    document.getElementById("footer").innerHTML = footerContent;
    document.getElementById("footer").style.backgroundColor = '#218838'; // Hijau lebih gelap untuk footer

    // Fungsi logout
    window.logout = function() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userRole");
        window.location.href = "index.html";
    }
});
