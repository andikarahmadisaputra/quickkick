document.addEventListener("DOMContentLoaded", function () {  
    // Pilih bulan
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
  
    // Loop untuk menambahkan opsi bulan
    for (let i = 0; i < bulan.length; i++) {
      let option = document.createElement("option");
      option.value = bulan[i].value;
      option.textContent = bulan[i].text;
  
      // Set bulan sekarang sebagai default selected
      if (i === bulanSekarang) {
        option.selected = true;
      }
  
      selectBulan.appendChild(option);
    }
  
    // Pilih tahun
    const selectTahun = document.getElementById("tahun");
    let tahunSekarang = new Date().getFullYear();
  
    // Loop untuk menambahkan opsi tahun
    for (let i = tahunSekarang + 1; i > tahunSekarang - 2; i--) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i;
  
      // Set tahun sekarang sebagai default selected
      if (i === tahunSekarang) {
        option.selected = true;
      }
  
      selectTahun.appendChild(option);
    }
  
    function generateTable() {
        const table = document.getElementById("bookingTable");

        // Buat thead
        table.innerHTML = `
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Lapangan</th>
                    <th>Harga</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody id="bookingTableBody"></tbody>
        `;

        let tbody = table.createTBody();
        const today = new Date();

        bookings.forEach((booking) => {
            const bookingDate = new Date(booking.tanggal);
            const timeDiff = (bookingDate - today) / (1000 * 60 * 60 * 24); // Selisih hari

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.tanggal}</td>
                <td>${booking.jam}</td>
                <td>${booking.nama_lapangan}</td>
                <td>Rp ${booking.harga.toLocaleString("id-ID")}</td>
                <td>${booking.status}</td>
                <td></td>
            `;

            // Tambah tombol "Reschedule" jika status "Dikonfirmasi" & lebih dari 7 hari dari sekarang
            if (booking.status === "Dikonfirmasi" && timeDiff > 7) {
                const actionCell = row.querySelector("td:last-child");
                const btn = document.createElement("button");
                btn.className = "btn btn-warning btn-sm";
                btn.textContent = "Reschedule";
                btn.onclick = () => alert(`Reschedule untuk Booking ID: ${booking.id}`);
                actionCell.appendChild(btn);
            }

            tbody.appendChild(row);
        });
    }
  
    // Menambah event ketika btn proses diklik
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
  });
  