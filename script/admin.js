document.addEventListener("DOMContentLoaded", function() {

    const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">QuickKick</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="admin.html">Admin</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
          </ul>
          <div class="d-flex">
            <a href="#" class="btn btn-outline-light me-2">Registrasi</a>
            <a href="#" class="btn btn-outline-light">Login</a>
          </div>
          <button id="darkModeToggle" class="btn btn-outline-light ms-3">
            🌙
          </button>
        </div>
      </div>
    </nav>
    `
    document.getElementById('navbar').innerHTML = navbar;



    const dataUser = users.map(user => {
        return `<li>${user.nama}</li>`
    });

    const result = lapangan.map(data => {
        return `
        <section class="container my-5">
          <h2 class="text-center">Lapangan Populer</h2>
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${data.nama}</h5>
                  <p class="card-text">${data.jenis} - Rp${data.reguler}</p>
                  <a href="#" class="btn btn-primary">Lihat Detail</a>
                </div>
              </div>
            </div>
          </div>
        </section>`
    });

    document.getElementById('app').innerHTML = result;


});