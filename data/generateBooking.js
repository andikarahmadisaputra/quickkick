import { user } from "./user.js";
import { lapangan } from "./lapangan.js";

function generateBookings(month, year, totalBookings) {
  const result = [];
  const users = user.filter(u => u.id !== 1); // Jangan gunakan user dengan id 1
  const bookedTimes = new Map(); // Menyimpan jadwal yang sudah dipakai
  const statusOptions = ["Dibatalkan", "Menunggu Konfirmasi", "Dikonfirmasi"];

  function getRandomTime() {
    let hour;
    do {
      hour = Math.floor(Math.random() * (22 - 8) + 8); // Jam antara 08:00 - 22:00
    } while (hour < 8 || hour > 22);
    return `${hour}:00`;
  }

  function getBookingPrice(lapanganData, tanggal) {
    const dayOfWeek = new Date(tanggal).getDay(); // 0 = Minggu, 6 = Sabtu
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let price = isWeekend ? lapanganData.harga.weekend : lapanganData.harga.reguler;
    
    // Gunakan harga promo jika tersedia
    if (isWeekend && lapanganData.harga.promo.weekend > 0) {
      price = lapanganData.harga.promo.weekend;
    } else if (!isWeekend && lapanganData.harga.promo.reguler > 0) {
      price = lapanganData.harga.promo.reguler;
    }
    return price;
  }

  for (let i = 1; i <= totalBookings; i++) {
    const pemesan = users[Math.floor(Math.random() * users.length)];
    const lapanganData = lapangan[Math.floor(Math.random() * lapangan.length)];
    let tanggal, jam, status;

    do {
      const day = Math.floor(Math.random() * 28) + 1; // Random tanggal dari 1 - 28
      tanggal = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      jam = getRandomTime();
    } while (
      bookedTimes.has(`${tanggal}-${jam}-${lapanganData.id}`) || // Cek bentrok di lapangan yang sama
      (bookedTimes.has(`${tanggal}-${jam}`) && bookedTimes.get(`${tanggal}-${jam}`) !== "Dibatalkan") // Jika ada booking "Menunggu Konfirmasi" atau "Dikonfirmasi", jangan buat booking baru
    );

    // Tandai waktu sebagai terpakai
    status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    bookedTimes.set(`${tanggal}-${jam}-${lapanganData.id}`, status);
    bookedTimes.set(`${tanggal}-${jam}`, status); // Untuk cek bentrok antar lapangan

    result.push({
      id: i,
      pemesan_id: pemesan.id,
      lapangan_id: lapanganData.id,
      tanggal,
      jam,
      harga: getBookingPrice(lapanganData, tanggal),
      status,
    });
  }

  return result;
}

const bookings = generateBookings(3, 2025, 100);
console.log(bookings);

/*
Penjelasan Validasi
Menghindari Bentrok Jadwal:

Cek apakah tanggal & jam sudah terpakai di lapangan yang sama.
Jika sudah ada booking dengan "Menunggu Konfirmasi" atau "Dikonfirmasi", tidak boleh ada booking baru di waktu tersebut.
Jika ada booking "Dibatalkan", boleh dibuat booking baru dengan status "Menunggu Konfirmasi" atau "Dikonfirmasi".
Penentuan Harga:

Cek apakah hari reguler atau weekend.
Jika ada harga promo, gunakan harga promo yang berlaku.
Menjaga Data Unik & Realistis:

Tanggal dan jam diacak, tapi tetap mengikuti aturan.
Jam selalu dalam format HH:00 (tidak ada menit selain 00).
*/