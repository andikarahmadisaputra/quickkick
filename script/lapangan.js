document.addEventListener("DOMContentLoaded", function () {
  // Pilih lapangan
  const selectLapangan = document.getElementById("lapangan");
  lapanganStorage.forEach((opt) => {
    let option = document.createElement("option");
    option.value = opt.id;
    option.textContent = opt.nama;
    selectLapangan.appendChild(option);
  });

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

  // Function untuk menampilkan tabel
  function generateTable(table, data) {
    table.innerHTML = ""; // Reset tabel

    // Ambil semua jam dari salah satu entry (karena semua punya jam yang sama)
    const hours = Object.keys(Object.values(data)[0]);

    // Buat header tabel
    let thead = table.createTHead();
    thead.className = "text-center table-light";
    let headerRow = thead.insertRow();
    let th = document.createElement("th");
    th.textContent = "Tanggal";
    th.className = "sticky-column sticky-header";
    headerRow.appendChild(th);

    // Tambahkan kolom jam
    hours.forEach((hour) => {
      let th = document.createElement("th");
      th.textContent = hour;
      th.className = "sticky-header";
      headerRow.appendChild(th);
    });

    // Buat body tabel
    let tbody = table.createTBody();

    Object.entries(data).forEach(([date, bookings]) => {
      let row = tbody.insertRow();
      let dateCell = row.insertCell();
      dateCell.textContent = date;
      dateCell.className = "sticky-column";

      // Isi data pemesan
      hours.forEach((hour) => {
        let cell = row.insertCell();
        cell.textContent = bookings[hour] || ""; // Nama pemesan atau kosong
      });
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
