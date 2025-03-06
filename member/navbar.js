document.addEventListener("DOMContentLoaded", function () {
    // Navbar untuk member
    const navbarContent = `
        <div class="container">
            <a class="navbar-brand fw-bold" href="member/member.html">
                <i class="fas fa-futbol me-2"></i>QuickKick
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="member/member.html">
                            <i class="fas fa-calendar-check me-1"></i>Booking
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="member/cek-lapangan.html">
                            <i class="fas fa-map-marker-alt me-1"></i>Cek Lapangan
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="member/riwayat.html">
                            <i class="fas fa-history me-1"></i>Riwayat
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="member/reschedule.html">
                            <i class="fas fa-clock me-1"></i>Reschedule
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-3">
                    <li class="nav-item">
                        <a class="nav-link btn btn-outline-light px-3 py-1 mx-1" href="member/member.html">
                            <i class="fas fa-user me-1"></i>Member
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn btn-danger px-3 py-1 mx-1" onclick="logout()">
                            <i class="fas fa-sign-out-alt me-1"></i>Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>`;
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = navbarContent;
    navbar.style.background = 'linear-gradient(90deg, #28a745, #34c759)';
    navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    navbar.style.animation = 'slideDown 0.5s ease-in-out';

    // Styling tambahan untuk navbar
    const style = document.createElement('style');
    style.textContent = `
        #navbar .nav-link {
            color: #fff;
            font-weight: 500;
            padding: 10px 15px;
            transition: color 0.3s ease, transform 0.2s ease;
        }
        #navbar .nav-link:hover {
            color: #f0f4f8;
            transform: translateY(-2px);
        }
        #navbar .btn {
            border-radius: 8px;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
        #navbar .btn:hover {
            transform: scale(1.05);
        }
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Footer
    const footerContent = `
        <div class="container">
            <div class="row text-center">
                <div class="col-md-4 mb-3">
                    <p><strong>Kontak:</strong><br>
                    <a href="mailto:info@quickkick.com" class="text-white text-decoration-none"><i class="fas fa-envelope me-1"></i>info@quickkick.com</a><br>
                    <i class="fab fa-whatsapp me-1"></i>08123456789</p>
                </div>
                <div class="col-md-4 mb-3">
                    <p><strong>Ikuti Kami:</strong><br>
                    <a href="#" class="text-white text-decoration-none mx-2"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-white text-decoration-none mx-2"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="text-white text-decoration-none mx-2"><i class="fab fa-twitter"></i></a></p>
                </div>
                <div class="col-md-4 mb-3">
                    <p><strong>Informasi:</strong><br>
                    <a href="#" class="text-white text-decoration-none"><i class="fas fa-shield-alt me-1"></i>Kebijakan Privasi</a><br>
                    <a href="#" class="text-white text-decoration-none"><i class="fas fa-file-alt me-1"></i>Syarat & Ketentuan</a></p>
                </div>
            </div>
        </div>`;
    const footer = document.getElementById("footer");
    footer.innerHTML = footerContent;
    footer.style.background = 'linear-gradient(90deg, #218838, #2d9c4b)';
    footer.style.padding = '30px 0';
    footer.style.boxShadow = '0 -4px 15px rgba(0, 0, 0, 0.2)';

    // Styling tambahan untuk footer
    const footerStyle = document.createElement('style');
    footerStyle.textContent = `
        #footer a {
            transition: color 0.3s ease;
        }
        #footer a:hover {
            color: #f0f4f8;
        }
        #footer p {
            margin-bottom: 10px;
        }
    `;
    document.head.appendChild(footerStyle);

    // Inisialisasi elemen filter (khusus untuk riwayat.html)
    const bulanSelect = document.getElementById('bulan');
    if (bulanSelect) {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.text = month;
            bulanSelect.appendChild(option);
        });
    }

    const tahunSelect = document.getElementById('tahun');
    if (tahunSelect) {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear - 5; year <= currentYear + 5; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.text = year;
            tahunSelect.appendChild(option);
        }
    }

    // Logika tombol proses (khusus untuk riwayat.html)
    const prosesButton = document.getElementById('proses');
    if (prosesButton) {
        prosesButton.addEventListener('click', () => {
            const bulan = bulanSelect.value;
            const tahun = tahunSelect.value;
            if (bulan && tahun) {
                alert(`Memproses riwayat untuk Bulan: ${months[bulan - 1]}, Tahun: ${tahun}`);
                // Tambahkan logika untuk mengambil data dari server di sini
            } else {
                alert('Silakan pilih bulan dan tahun terlebih dahulu!');
            }
        });
    }

    // Fungsi logout (contoh, sesuaikan dengan logika Anda)
    window.logout = function() {
        alert('Logout berhasil!');
        window.location.href = 'auth/login.html';
    };
});