document.addEventListener("DOMContentLoaded", function () {
    const sidebarItems = document.querySelectorAll(".sidebar li");
    const contentDivs = document.querySelectorAll(".content > div");

    window.scrollTo({ top: 0, behavior: 'smooth' });

    sidebarItems.forEach(item => {
        item.addEventListener("click", function () {
            const page = this.dataset.page;

            sidebarItems.forEach(li => li.classList.remove("active"));
            this.classList.add("active");

            contentDivs.forEach(div => {
                div.classList.remove("show");
                div.style.display = "none";
            });

            const activeContent = document.getElementById(`${page}-content`);
            activeContent.style.display = "block";
            setTimeout(() => {
                activeContent.classList.add("show");
            }, 10);

            activeContent.scrollIntoView({ behavior: 'smooth' });

            if (page === "cek-lapangan") {
                loadCekLapangan();
            } else if (page === "data-lapangan") {
                loadDataLapangan();
            } else if (page === "data-booking") {
                loadDataBooking();
            }
        });
    });

    function loadDataLapangan() {
        const dataLapanganContent = document.getElementById("data-lapangan-content");
        dataLapanganContent.innerHTML = `
            <h2 class="text-center bold-text">Daftar Lapangan Yang Tersedia</h2>
            <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addModal">Tambah Lapangan</button>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nama Lapangan</th>
                        <th>Jenis Lapangan</th>
                        <th>Harga Reguler</th>
                        <th>Harga Weekend</th>
                        <th>Fasilitas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="lapanganTable"></tbody>
            </table>
            <div class="modal fade" id="addModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Tambah/Edit Lapangan</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="lapanganId">
                            <div class="mb-3">
                                <label class="form-label">Nama Lapangan</label>
                                <input type="text" class="form-control" id="lapanganNama" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Jenis Lapangan</label>
                                <input type="text" class="form-control" id="lapanganJenis" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Harga Reguler</label>
                                <input type="number" class="form-control" id="lapanganHargaReguler" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Harga Weekend</label>
                                <input type="number" class="form-control" id="lapanganHargaWeekend" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Fasilitas (pisahkan dengan koma)</label>
                                <input type="text" class="form-control" id="lapanganFasilitas" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-success" id="saveLapangan">Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        let lapanganData = JSON.parse(localStorage.getItem("lapangan_storage")) || [];
        const tableBody = document.getElementById("lapanganTable");
        const modal = new bootstrap.Modal(document.getElementById("addModal"));

        function renderLapangan() {
            tableBody.innerHTML = "";
            lapanganData.forEach((lapangan, index) => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${lapangan.nama}</td>
                        <td>${lapangan.jenis}</td>
                        <td>Rp${lapangan.harga.reguler.toLocaleString()}</td>
                        <td>Rp${lapangan.harga.weekend.toLocaleString()}</td>
                        <td>${lapangan.fasilitas.join(", ")}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Hapus</button>
                        </td>
                    </tr>
                `;
            });
            addEventListeners();
        }

        function addEventListeners() {
            document.querySelectorAll(".edit-btn").forEach(btn => {
                btn.addEventListener("click", function () {
                    let index = this.dataset.index;
                    let lapangan = lapanganData[index];

                    document.getElementById("lapanganId").value = index;
                    document.getElementById("lapanganNama").value = lapangan.nama;
                    document.getElementById("lapanganJenis").value = lapangan.jenis;
                    document.getElementById("lapanganHargaReguler").value = lapangan.harga.reguler;
                    document.getElementById("lapanganHargaWeekend").value = lapangan.harga.weekend;
                    document.getElementById("lapanganFasilitas").value = lapangan.fasilitas.join(", ");

                    modal.show();
                });
            });

            document.querySelectorAll(".delete-btn").forEach(btn => {
                btn.addEventListener("click", function () {
                    let index = this.dataset.index;
                    if (confirm("Apakah Anda yakin ingin menghapus lapangan ini?")) {
                        lapanganData.splice(index, 1);
                        localStorage.setItem("lapangan_storage", JSON.stringify(lapanganData));
                        renderLapangan();
                    }
                });
            });
        }

        document.getElementById("saveLapangan").addEventListener("click", function () {
            let id = document.getElementById("lapanganId").value;
            let nama = document.getElementById("lapanganNama").value;
            let jenis = document.getElementById("lapanganJenis").value;
            let hargaReguler = parseInt(document.getElementById("lapanganHargaReguler").value);
            let hargaWeekend = parseInt(document.getElementById("lapanganHargaWeekend").value);
            let fasilitas = document.getElementById("lapanganFasilitas").value.split(",").map(item => item.trim());

            if (!nama || !jenis || isNaN(hargaReguler) || isNaN(hargaWeekend) || !fasilitas) {
                alert("Semua kolom harus diisi dengan benar!");
                return;
            }

            if (id !== "") {
                lapanganData[id] = {
                    id: parseInt(id) + 1,
                    nama,
                    jenis,
                    harga: { reguler: hargaReguler, weekend: hargaWeekend },
                    fasilitas: fasilitas
                };
            } else {
                lapanganData.push({
                    id: lapanganData.length + 1,
                    nama,
                    jenis,
                    harga: { reguler: hargaReguler, weekend: hargaWeekend },
                    fasilitas: fasilitas
                });
            }

            localStorage.setItem("lapangan_storage", JSON.stringify(lapanganData));
            renderLapangan();
            modal.hide();
        });

        renderLapangan();
    }

    function loadCekLapangan() {
        const selectLapangan = document.getElementById("lapangan");
        lapanganStorage.forEach((opt) => {
            let option = document.createElement("option");
            option.value = opt.id;
            option.textContent = opt.nama;
            selectLapangan.appendChild(option);
        });

        const bulan = [
            { value: 1, text: "Januari" },
            { value: 2, text: "Februari" },
            { value: 3, text: "Maret" },
            { value: 4, text: "April" },
            { value: 5, text: "Mei" },
            { value: 6, text: "Juni" },
            { value: 7, text: "Juli" },
            { value: 8, text: "Agustus" },
            { value: 9, text: "September" },
            { value: 10, text: "Oktober" },
            { value: 11, text: "November" },
            { value: 12, text: "Desember" },
        ];
        const selectBulan = document.getElementById("bulan");
        let bulanSekarang = new Date().getMonth();

        for (let i = 0; i < bulan.length; i++) {
            let option = document.createElement("option");
            option.value = bulan[i].value;
            option.textContent = bulan[i].text;

            if (i === bulanSekarang) {
                option.selected = true;
            }

            selectBulan.appendChild(option);
        }

        const selectTahun = document.getElementById("tahun");
        let tahunSekarang = new Date().getFullYear();

        for (let i = tahunSekarang + 1; i > tahunSekarang - 2; i--) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;

            if (i === tahunSekarang) {
                option.selected = true;
            }

            selectTahun.appendChild(option);
        }

        function generateTable(table, data) {
            table.innerHTML = "";

            const hours = Object.keys(Object.values(data)[0]);

            let thead = table.createTHead();
            thead.className = "text-center table-light";
            let headerRow = thead.insertRow();
            let th = document.createElement("th");
            th.textContent = "Tanggal";
            th.className = "sticky-column sticky-header";
            headerRow.appendChild(th);

            hours.forEach((hour) => {
                let th = document.createElement("th");
                th.textContent = hour;
                th.className = "sticky-header";
                headerRow.appendChild(th);
            });

            let tbody = table.createTBody();

            Object.entries(data).forEach(([date, bookings]) => {
                let row = tbody.insertRow();
                let dateCell = row.insertCell();
                dateCell.textContent = date;
                dateCell.className = "sticky-column";

                hours.forEach((hour) => {
                    let cell = row.insertCell();
                    cell.textContent = bookings[hour] || "";
                });
            });
        }

        document.getElementById("proses").addEventListener("click", function () {
            const bookingTable = document.getElementById("bookingTable");
            const filterLapangan = document.getElementById("lapangan").value;
            const filterTahun = document.getElementById("tahun").value;
            const filterBulan = document.getElementById("bulan").value;
            const jadwalBooking = getBookingsByLapanganAndMonth(
                bookingStorage,
                userStorage,
                Number(filterLapangan),
                Number(filterTahun),
                Number(filterBulan)
            );

            generateTable(bookingTable, jadwalBooking);
        });
    }

    function loadDataBooking() {
        const memberBookingTableBody = document.getElementById("memberBookingTableBody");
        const searchInput = document.getElementById("search-booking");

        function renderBookingTable(data) {
            memberBookingTableBody.innerHTML = "";
            data.forEach(booking => {
                const member = userStorage.find(user => user.id === booking.pemesan_id);
                const lapangan = lapanganStorage.find(lap => lap.id === booking.lapangan_id);

                memberBookingTableBody.innerHTML += `
                    <tr>
                        <td>${booking.id}</td>
                        <td>${member ? member.nama : "Unknown"}</td>
                        <td>${lapangan ? lapangan.nama : "Unknown"}</td>
                        <td>${booking.tanggal}</td>
                        <td>${booking.jam}</td>
                        <td>Rp${booking.harga.toLocaleString()}</td>
                        <td>${booking.status}</td>
                    </tr>
                `;
            });
        }

        // Render semua data booking saat pertama kali dimuat
        renderBookingTable(bookingStorage);

        // Tambahkan event listener untuk fitur pencarian
        searchInput.addEventListener("input", function () {
            const searchTerm = this.value.toLowerCase();
            const filteredData = bookingStorage.filter(booking => {
                const member = userStorage.find(user => user.id === booking.pemesan_id);
                return (
                    booking.id.toString().includes(searchTerm) ||
                    (member && member.nama.toLowerCase().includes(searchTerm))
                );
            });
            renderBookingTable(filteredData);
        });
    }

    function showLogoutModal() {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("logout-modal").style.display = "block";
    }

    // Fungsi untuk menyembunyikan modal logout
    function hideLogoutModal() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("logout-modal").style.display = "none";
    }

    // Event listener untuk tombol logout
    document.getElementById("confirm-logout").addEventListener("click", function () {
        alert("Anda telah logout!");
        window.location.href = "../auth/login.html"; // Redirect ke halaman login
    });

    // Event listener untuk tombol batal
    document.getElementById("cancel-logout").addEventListener("click", function () {
        hideLogoutModal(); // Sembunyikan modal logout
    });

    // Contoh: Menambahkan event listener ke tombol logout di sidebar
    document.querySelector(".sidebar li[data-page='logout']").addEventListener("click", function () {
        showLogoutModal(); // Tampilkan modal logout
    });

    loadDataLapangan();
});