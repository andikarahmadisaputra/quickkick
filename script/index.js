document.addEventListener("DOMContentLoaded", function () {
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

    // Section Banner
    const banner = `
        <div class="video-background">
            <video autoplay muted loop id="bg-video">
                <source src="footage/futsal.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="banner-overlay"></div>
            <div class="container banner-content">
                <h1 class="display-4 fw-bold">Selamat Datang di QuickKick</h1>
                <p class="lead">Pesan lapangan futsal dengan mudah dan cepat melalui aplikasi kami.</p>
                <a href="/auth/login.html" class="btn btn-primary btn-lg">Booking Sekarang</a>
            </div>
        </div>`;
    document.getElementById("banner").innerHTML = banner;

    // Section Lapangan
    const lapangan = `
        <h2 class="text-center mb-4">Lapangan Populer</h2>
        <div class="row">
            ${data_lapangan
            .map(
                (detailLapangan) => `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${detailLapangan.nama}</h5>
                            <p class="card-text">Jenis: ${detailLapangan.jenis}</p>
                            <p class="card-text">Harga mulai dari: Rp${detailLapangan.harga.reguler}</p>
                            <p class="card-text">Fasilitas: ${detailLapangan.fasilitas.join(", ")}</p>
                            <a href="#" class="btn btn-primary">Lihat Detail</a>
                        </div>
                    </div>
                </div>`
            )
            .join("")}
        </div>`;
    document.getElementById("lapangan").innerHTML = lapangan;

    // Section Promo
    const promo = `
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
        </div>`;
    document.getElementById("promo").innerHTML = promo;

    // Section Cara Booking
    const caraBooking = `
        <h2 class="text-center mb-4">Cara Booking</h2>
        <ol class="list-group list-group-numbered">
            <li class="list-group-item">Pilih lapangan</li>
            <li class="list-group-item">Pilih jadwal</li>
            <li class="list-group-item">Bayar</li>
            <li class="list-group-item">Main</li>
        </ol>`;
    document.getElementById("caraBooking").innerHTML = caraBooking;

    // Section Testimoni
    const testimoni = `
        <h2 class="text-center mb-4">Testimoni Pengguna</h2>
        <div class="card">
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>"Pelayanan sangat cepat dan lapangan berkualitas!"</p>
                    <footer class="blockquote-footer">Rizky, Jakarta</footer>
                </blockquote>
            </div>
        </div>`;
    document.getElementById("testimoni").innerHTML = testimoni;

    // Section FAQ
    const faq = `
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
        </div>`;
    document.getElementById("faq").innerHTML = faq;

    // Footer
    const footer = `
        <div class="container">
            <p>Kontak: <a href="mailto:info@quickkick.com" class="text-white">info@quickkick.com</a> | WhatsApp: 08123456789</p>
            <p>Ikuti kami: <a href="#" class="text-white">Instagram</a> | <a href="#" class="text-white">Facebook</a> | <a href="#" class="text-white">Twitter</a></p>
            <p><a href="#" class="text-white">Kebijakan Privasi</a> | <a href="#" class="text-white">Syarat & Ketentuan</a></p>
        </div>`;
    document.getElementById("footer").innerHTML = footer;
});