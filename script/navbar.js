document.addEventListener("DOMContentLoaded", function () {
  const auth = isAuthenticated();
  const role = auth ? getUserRole() : null;

  // Navbar
  const navbar = `<div class="container">
<a class="navbar-brand fw-bold" href="index.html">QuickKick</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="index.html">Beranda</a></li>
        <li class="nav-item"><a class="nav-link" href="lapangan.html">Cek Jadwal</a></li>
        <li class="nav-item"><a class="nav-link" href="#promo">Promo</a></li>
        <li class="nav-item"><a class="nav-link" href="#testimoni">Testimoni</a></li>
        <li class="nav-item"><a class="nav-link" href="#faq">FAQ</a></li>
        <li class="nav-item"><a class="nav-link btn btn-primary text-white px-3" href="auth/login.html">Booking</a></li>
    </ul>

    <ul class="navbar-nav ms-3">
        ${auth && role === "admin"
            ? `<li class="nav-item"><a class="nav-link btn btn-outline-light px-3" href="admin/admin.html">Admin</a></li>`
            : ""
        }
        ${auth && role === "member"
            ? `<li class="nav-item"><a class="nav-link btn btn-outline-light px-3" href="member/index.html">Member</a></li>`
            : ""
        }
        ${auth
            ? `<li class="nav-item ms-2"><a class="nav-link btn btn-danger text-white px-3" onclick="logout()">Logout</a></li>`
            : `<li class="nav-item"><a class="nav-link btn btn-primary px-3" href="auth/login.html">Login</a></li>`
        }
    </ul>
</div>
</div>`;
    document.getElementById("navbar").innerHTML = navbar;

  // Footer
  const footer = `<div class="container">
<p>Kontak: <a href="mailto:info@quickkick.com" class="text-white">info@quickkick.com</a> | WhatsApp: 08123456789</p>
<p>Ikuti kami: <a href="#" class="text-white">Instagram</a> | <a href="#" class="text-white">Facebook</a> | <a href="#" class="text-white">Twitter</a></p>
<p><a href="#" class="text-white">Kebijakan Privasi</a> | <a href="#" class="text-white">Syarat & Ketentuan</a></p>
</div>`;
  document.getElementById("footer").innerHTML = footer;
});
