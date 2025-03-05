function bookField() {
    const field = document.getElementById('field').value;
    const date = document.getElementById('date').value;

    if (field && date) {
        alert(`Anda telah memesan ${field} untuk tanggal ${date}`);
        // bisa menambahkan logika untuk mengirim data ke server
    } else {
        alert('Silakan pilih lapangan dan tanggal terlebih dahulu!');
    }
}

// Contoh untuk memperbarui daftar lapangan (opsional)
function updateFieldList() {
    const fieldList = document.getElementById('fieldList');
    // Logika untuk memperbarui daftar lapangan bisa ditambahkan di sini
}