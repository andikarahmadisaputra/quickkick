export function Dashboard() {
    setTimeout(() => {
        let elements = document.querySelectorAll(".fade-in");

        function checkScroll() {
            let windowHeight = window.innerHeight;
            elements.forEach(el => {
                let position = el.getBoundingClientRect().top;
                if (position < windowHeight - 50) {
                    el.classList.add("visible");
                }
            });
        }

        window.addEventListener("scroll", checkScroll);
        checkScroll();
    }, 0);

    return `
        <section class="banner">
            <div class="banner-overlay"></div>
            <div class="container banner-content">
                <h1 class="display-4 fw-bold">Selamat Datang di QuickKick</h1>
                <p class="lead">Pesan lapangan futsal dengan mudah dan cepat melalui aplikasi kami.</p>
                <a href="#" class="btn btn-primary btn-lg">Booking Sekarang</a>
            </div>
        </section>

        <section id="lapangan" class="container my-5">
            <h2 class="text-center mb-4">Lapangan Populer</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Lapangan Sintetis A</h5>
                            <p class="card-text">Jenis: Rumput Sintetis</p>
                            <p class="card-text">Harga mulai dari: Rp100.000</p>
                            <p class="card-text">Fasilitas: Lampu LED, Bench Pemain, Toilet, Kantin</p>
                            <a href="#" class="btn btn-primary">Lihat Detail</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Lapangan Vinyl B</h5>
                            <p class="card-text">Jenis: Vinyl</p>
                            <p class="card-text">Harga mulai dari: Rp90.000</p>
                            <p class="card-text">Fasilitas: AC, Lampu LED, Bench Pemain, Toilet</p>
                            <a href="#" class="btn btn-primary">Lihat Detail</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Lapangan Parquet C</h5>
                            <p class="card-text">Jenis: Parquet</p>
                            <p class="card-text">Harga mulai dari: Rp100.000</p>
                            <p class="card-text">Fasilitas: Lampu LED, Bench Pemain, Toilet, Kantin</p>
                            <a href="#" class="btn btn-primary">Lihat Detail</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="promo" class="container my-5">
            <h2 class="text-center mb-4">Promo & Diskon</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Harga Reguler</h5>
                            <p class="card-text">Mulai dari Rp100.000</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Harga Weekend</h5>
                            <p class="card-text">Mulai dari Rp130.000</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Promo Khusus</h5>
                            <p class="card-text">Diskon hingga 20%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="container my-5 fade-in">
            <h2 class="text-center mb-4">Cara Booking</h2>
            <ol class="list-group list-group-numbered">
                <li class="list-group-item">Pilih lapangan</li>
                <li class="list-group-item">Pilih jadwal</li>
                <li class="list-group-item">Bayar</li>
                <li class="list-group-item">Main</li>
            </ol>
        </section>

        <section id="testimoni" class="container my-5 fade-in">
            <h2 class="text-center mb-4">Testimoni Pengguna</h2>
            <div class="card">
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>"Pelayanan sangat cepat dan lapangan berkualitas!"</p>
                        <footer class="blockquote-footer">Rizky, Jakarta</footer>
                    </blockquote>
                </div>
            </div>
        </section>

        <section id="faq" class="container my-5">
            <h2 class="text-center mb-4">FAQ (Pertanyaan Umum)</h2>
            <div class="accordion" id="faqAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                            Bagaimana cara membayar?
                        </button>
                    </h2>
                    <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Pembayaran dapat dilakukan melalui transfer bank atau e-wallet.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="bg-dark text-white text-center py-4">
            <div class="container">
                <p>Kontak: <a href="mailto:info@quickkick.com" class="text-white">info@quickkick.com</a> | WhatsApp: 08123456789</p>
                <p>Ikuti kami: <a href="#" class="text-white">Instagram</a> | <a href="#" class="text-white">Facebook</a> | <a href="#" class="text-white">Twitter</a></p>
                <p><a href="#" class="text-white">Kebijakan Privasi</a> | <a href="#" class="text-white">Syarat & Ketentuan</a></p>
            </div>
        </footer>
    `;
}
