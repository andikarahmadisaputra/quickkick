if (!isAuthenticated()) {
  window.location.href = "/auth/login.html";
}

if (getUserRole() !== "member") {
  window.location.href = "/index.html";
}

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

  document.getElementById("nama").innerText = getUserLogin().nama;
  document.getElementById("telp").innerText = getUserLogin().telp;

  // Pilih lapangan
  const bookingLapangan = document.getElementById("bookingLapangan");
  lapanganStorage.forEach((opt) => {
    let option = document.createElement("option");
    option.value = opt.id;
    option.textContent = opt.nama;
    bookingLapangan.appendChild(option);
  });

  document
    .getElementById("bookingLapangan")
    .addEventListener("change", updateAvailableTimes);
  document
    .getElementById("tanggalBooking")
    .addEventListener("change", updateAvailableTimes);

  function updateAvailableTimes() {
    const lapanganId = document.getElementById("bookingLapangan").value;
    const selectedDate = document.getElementById("tanggalBooking").value;
    const timeSelect = document.getElementById("waktuBooking");

    // Reset option waktu
    timeSelect.innerHTML = "<option value=''>Pilih Waktu</option>";

    if (!lapanganId || !selectedDate) return;

    // Waktu operasional lapangan (misalnya 08:00 - 22:00)
    const allTimes = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);

    // Ambil waktu yang sudah dibooking untuk lapangan & tanggal yang dipilih
    const bookedTimes = bookingStorage
      .filter((b) => b.lapangan_id == lapanganId && b.tanggal === selectedDate)
      .map((b) => b.jam);

    // Filter waktu yang belum dipesan
    const availableTimes = allTimes.filter(
      (time) => !bookedTimes.includes(time)
    );

    // Tambahkan waktu yang tersedia ke select option
    availableTimes.forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      timeSelect.appendChild(option);
    });
  }

  document
    .getElementById("tanggalBooking")
    .addEventListener("change", updatePrice);
  document
    .getElementById("bookingLapangan")
    .addEventListener("change", updatePrice);

  function updatePrice() {
    const lapanganId = document.getElementById("bookingLapangan").value;
    const selectedDate = document.getElementById("tanggalBooking").value;
    const priceField = document.getElementById("price");

    if (!lapanganId || !selectedDate) {
      priceField.textContent = "Rp 0";
      return;
    }

    const day = new Date(selectedDate).getDay(); // 0 = Minggu, 6 = Sabtu
    const isWeekend = day === 0 || day === 6;

    const hargaData = lapanganStorage.find((data) => 
      parseInt(data.id) === parseInt(lapanganId)
    );

    let harga = isWeekend ? hargaData.harga.weekend : hargaData.harga.reguler;
    let promo = isWeekend ? hargaData.harga.promo.weekend : hargaData.harga.promo.reguler;

    // Gunakan harga promo jika tidak nol
    harga = promo > 0 ? promo : harga;

    priceField.textContent = `Rp ${harga.toLocaleString("id-ID")}`;
  }

  document.getElementById("submit").addEventListener("click", function () {
    const pemesanId = getUserLogin().id;
    const lapanganId = document.getElementById("bookingLapangan").value;
    const tanggal = document.getElementById("tanggalBooking").value;
    const waktu = document.getElementById("waktuBooking").value;

    const day = new Date(tanggal).getDay(); // 0 = Minggu, 6 = Sabtu
    const isWeekend = day === 0 || day === 6;
    const hargaData = lapanganStorage.find((data) => 
      parseInt(data.id) === parseInt(lapanganId)
    );
    let harga = isWeekend ? hargaData.harga.weekend : hargaData.harga.reguler;
    let promo = isWeekend ? hargaData.harga.promo.weekend : hargaData.harga.promo.reguler;
    
    // Ambil data dari localStorage atau buat array kosong jika belum ada
  let bookings = JSON.parse(localStorage.getItem("booking_storage")) || [];

  // Data baru yang ingin ditambahkan
  const newBooking = {
    id: bookings.length ? Math.max(...bookings.map(b => b.id)) + 1 : 1, // ID otomatis bertambah
    pemesan_id: pemesanId,
    lapangan_id: Number(lapanganId),
    tanggal: tanggal,
    jam: waktu,
    harga: harga = promo > 0 ? promo : harga,
    status: "Menunggu Konfirmasi",
  };

  // Tambahkan data baru ke dalam array
  bookings.push(newBooking);

  // Simpan kembali ke localStorage
  localStorage.setItem("booking_storage", JSON.stringify(bookings));

  window.location.href = "riwayat.html";

    });
});
