function bookField() {
    const field = document.getElementById('field').value;
    const date = document.getElementById('date').value;

    if (field && date) {
        // Redirect ke halaman booking-form.html dengan parameter URL
        window.location.href = `booking-form.html?field=${encodeURIComponent(field)}&date=${encodeURIComponent(date)}`;
    } else {
        alert('Silakan pilih lapangan dan tanggal terlebih dahulu!');
    }
}

function updateFieldList(bookedField, bookedDate) {
    const fieldList = document.getElementById('fieldList');
    const fields = fieldList.getElementsByTagName('p');

    for (let i = 0; i < fields.length; i++) {
        const fieldText = fields[i].textContent.split(' - ')[0];
        if (fieldText === bookedField) {
            fields[i].textContent = `${fieldText} - Dipesan untuk ${bookedDate}`;
            fields[i].className = 'booked';
        }
    }
}