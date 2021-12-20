<template>
  <v-main style="height: 100%">
    <div class="container d-flex justify-content-center" style="margin-top: 100px">
      <div class="card shadow" style="width: 18rem; float: left; margin-top: 20px">
        <div class="card-header" style="text-align: center; background-color: #ffb3c1; color: white">
          <b>Paket Santuy</b>
          <br />
          <b>Rp. 100.000</b>
        </div>
        <ul class="list-group list-group-flush text-left" style="padding-left: 0">
          <li class="list-group-item">Pengerjaan 2 Minggu</li>
          <li class="list-group-item">Hasil Tugas Berupa .doc dan .pdf</li>
          <li class="list-group-item">Jumlah halaman 1-10 Lembar</li>
          <li class="list-group-item d-flex justify-content-center">
            <router-link class="btn btn-outline-success btn-sm" :to="{ path: '/pemesanan' }" style="margin-top: 10px; margin-bottom: 10px">Pesan Sekarang</router-link>
          </li>
        </ul>
      </div>

      <div class="card shadow" style="width: 18rem; float: left">
        <div class="card-header" style="text-align: center; background-color: #fe5e54; color: white">
          <b>Paket Normal</b>
          <br />
          <b>Rp. 200.000</b>
        </div>
        <ul class="list-group list-group-flush text-left" style="padding-left: 0">
          <li class="list-group-item">Pengerjaan 4-7 Hari</li>
          <li class="list-group-item">Hasil Tugas Berupa .doc dan .pdf</li>
          <li class="list-group-item">Jumlah halaman 1-20 Lembar</li>
          <li class="list-group-item d-flex justify-content-center">
            <router-link class="btn btn-outline-success btn-sm" :to="{ path: '/pemesanan' }" style="margin-top: 10px; margin-bottom: 10px">Pesan Sekarang</router-link>
          </li>
        </ul>
      </div>

      <div class="card shadow" style="width: 18rem; float: left; margin-top: 20px">
        <div class="card-header" style="text-align: center; background-color: #00c9b8; color: white">
          <b>Paket Buruan Kuy</b>
          <br />
          <b>Rp. 300.000</b>
        </div>
        <ul class="list-group list-group-flush text-left" style="padding-left: 0">
          <li class="list-group-item">Pengerjaan 1-3 Hari</li>
          <li class="list-group-item">Hasil Tugas Berupa .doc dan .pdf</li>
          <li class="list-group-item">Jumlah halaman 1-25 Lembar</li>
          <li class="list-group-item d-flex justify-content-center">
            <router-link class="btn btn-outline-success btn-sm" :to="{ path: '/pemesanan' }" style="margin-top: 10px; margin-bottom: 10px">Pesan Sekarang</router-link>
          </li>
        </ul>
      </div>
    </div>
  </v-main>
</template>
