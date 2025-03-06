document.addEventListener("DOMContentLoaded", function () {
    let lapanganData = JSON.parse(localStorage.getItem("lapangan_storage")) || [
        { id: 1, nama: "Lapangan A", lokasi: "Jakarta", hargaReguler: 100000, hargaWeekend: 130000 },
        { id: 2, nama: "Lapangan B", lokasi: "Bandung", hargaReguler: 120000, hargaWeekend: 140000 }
    ];

    function renderLapangan() {
        const tableBody = document.getElementById("lapanganTable");
        tableBody.innerHTML = "";
        lapanganData.forEach((lapangan, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${lapangan.nama}</td>
                    <td>${lapangan.lokasi}</td>
                    <td>Rp${lapangan.hargaReguler}</td>
                    <td>Rp${lapangan.hargaWeekend}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Hapus</button>
                    </td>
                </tr>
            `;
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                let index = this.dataset.index;
                let lapangan = lapanganData[index];

                document.getElementById("lapanganId").value = index;
                document.getElementById("lapanganNama").value = lapangan.nama;
                document.getElementById("lapanganLokasi").value = lapangan.lokasi;
                document.getElementById("lapanganHargaReguler").value = lapangan.hargaReguler;
                document.getElementById("lapanganHargaWeekend").value = lapangan.hargaWeekend;

                new bootstrap.Modal(document.getElementById("addModal")).show();
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
        let lokasi = document.getElementById("lapanganLokasi").value;
        let hargaReguler = document.getElementById("lapanganHargaReguler").value;
        let hargaWeekend = document.getElementById("lapanganHargaWeekend").value;

        if (!nama || !lokasi || !hargaReguler || !hargaWeekend) {
            alert("Semua kolom harus diisi!");
            return;
        }

        if (id) {
            lapanganData[id] = { id: id, nama, lokasi, hargaReguler, hargaWeekend };
        } else {
            lapanganData.push({ id: lapanganData.length + 1, nama, lokasi, hargaReguler, hargaWeekend });
        }

        localStorage.setItem("lapangan_storage", JSON.stringify(lapanganData));
        renderLapangan();
        bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
    });

    renderLapangan();
});