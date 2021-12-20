<template>
  <v-main class="order">
    <h3 class="text-h3" font-weight-medium mb-5>Order</h3>

    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="orders" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
          <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card>
        <v-card-title>
          <span class="headLine">{{ formTitle }} Order</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="form.nama" label="Nama" required></v-text-field>
            <v-text-field v-model="form.email" label="Email" required></v-text-field>
            <v-text-field v-model="form.telepon" label="Telepon" required></v-text-field>
            <v-select v-model="form.jenis_paket" @change="harga" :items="['Paket Santuy', 'Paket Normal', 'Paket Buruan Kuy']" label="Jenis Paket" required></v-select>
            <v-text-field v-model="form.harga_paket" label="Harga Paket" readonly></v-text-field>
            <v-select v-model="form.promo" :items="promo" label="Promo" required></v-select>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin menghapus order ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }} </v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Nama", align: "start", sortable: true, value: "nama" },
        { text: "Email", value: "email" },
        { text: "Telepon", value: "telepon" },
        { text: "Jenis Paket", value: "jenis_paket" },
        { text: "Harga Paket", value: "harga_paket" },
        { text: "Nama Promo", value: "promo.nama_promo" },
        { text: "Diskon", value: "promo.diskon" },
        { text: "Actions", value: "actions" },
      ],
      order: new FormData(),
      orders: [],
      promo: [],
      form: {
        nama: null,
        email: null,
        telepon: null,
        jenis_paket: null,
        harga_paket: null,
        promo: null,
      },
      form_promo: {
        id: null,
        nama_promo: null,
        diskon: null,
      },
      deleteId: "",
      editId: "",
    };
  },
  methods: {
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },
    // Read Data Courses
    readData() {
      var url = this.$api + "/order";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.orders = response.data.data;
        });
    },
    // Simpan data course
    save() {
      this.load = true;
      var id_promo = null;
      var select = null;
      if (this.form.promo != null) {
        select = this.form.promo;
        for (let i = 0; i < this.form_promo.nama_promo.length; i++) {
          if (select.includes(this.form_promo.nama_promo[i])) {
            id_promo = this.form_promo.id[i];
            break;
          }
        }
      }
      this.$http
        .post(
          this.$api + "/order",
          {
            nama: this.form.nama,
            email: this.form.email,
            telepon: this.form.telepon,
            jenis_paket: this.form.jenis_paket,
            harga_paket: this.form.harga_paket,
            promo_id: id_promo,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          this.readData(); // baca data
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    // ubah data course
    update() {
      this.load = true;
      var id_promo = null;
      var select = null;
      if (this.form.promo != null) {
        select = this.form.promo;
        for (let i = 0; i < this.form_promo.nama_promo.length; i++) {
          if (select.includes(this.form_promo.nama_promo[i])) {
            id_promo = this.form_promo.id[i];
            break;
          }
        }
      }
      let newData = {
        nama: this.form.nama,
        email: this.form.email,
        telepon: this.form.telepon,
        jenis_paket: this.form.jenis_paket,
        harga_paket: this.form.harga_paket,
        promo_id: id_promo,
      };
      var url = this.$api + "/order/" + this.editId;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); // baca data
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    // Hapus data produk
    deleteData() {
      //menghapus data
      var url = this.$api + "/order/" + this.deleteId;
      this.load = true;
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); // baca data
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id;
      this.form.nama = item.nama;
      this.form.email = item.email;
      this.form.telepon = item.telepon;
      this.form.jenis_paket = item.jenis_paket;
      this.form.harga_paket = item.harga_paket;
      this.form.promo = item.promo.nama_promo + ": diskon " + item.promo.diskon;
      this.dialog = true;
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        nama: null,
        email: null,
        password: null,
        telepon: null,
        jenis_paket: null,
        harga_paket: null,
        promo: null,
      };
    },
    harga() {
      if (this.form.jenis_paket == "Paket Santuy") {
        this.form.harga_paket = 100000;
      } else if (this.form.jenis_paket == "Paket Normal") {
        this.form.harga_paket = 200000;
      } else if (this.form.jenis_paket == "Paket Buruan Kuy") {
        this.form.harga_paket = 300000;
      }
    },
    read_promo_id() {
      var url = this.$api + "/promo";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          let temp = response.data.data;
          this.form_promo.id = temp.map((v) => v.id);
          this.form_promo.nama_promo = temp.map((v) => v.nama_promo);
          this.form_promo.diskon = temp.map((v) => v.diskon);
          for (let i = 0; i < this.form_promo.nama_promo.length; i++) {
            this.promo.push(this.form_promo.nama_promo[i] + ": diskon " + this.form_promo.diskon[i]);
          }
        });
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
    this.read_promo_id();
  },
};
</script>
