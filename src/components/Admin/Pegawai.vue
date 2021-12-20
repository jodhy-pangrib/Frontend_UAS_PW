<template>
  <v-main class="pegawai">
    <h3 class="text-h3" font-weight-medium mb-5>Pegawai</h3>

    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="pegawais" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
          <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Pegawai</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="form.nama" label="Nama" required></v-text-field>
            <v-text-field v-model="form.email" label="Email" required></v-text-field>
            <v-text-field v-model="form.telepon" label="Telepon" required></v-text-field>
            <v-select v-model="form.lulusan" :items="['SMK', 'SMA', 'D3', 'D4', 'S1', 'S2']" label="Lulusan" required></v-select>
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
        <v-card-text>Anda Yakin ingin menghapus pegawai ini?</v-card-text>
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
  name: "Pegawai",
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
        { text: "Nama Pegawai", align: "start", sortable: true, value: "nama" },
        { text: "Email", value: "email" },
        { text: "Telepon", value: "telepon" },
        { text: "Lulusan", value: "lulusan" },
        { text: "Actions", value: "actions" },
      ],
      pegawais: [],
      form: {
        nama: null,
        email: null,
        telepon: null,
        lulusan: null,
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
      var url = this.$api + "/pegawai";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.pegawais = response.data.data;
        });
    },
    // Simpan data course
    save() {
      this.load = true;
      this.$http
        .post(
          this.$api + "/pegawai",
          {
            nama: this.form.nama,
            email: this.form.email,
            telepon: this.form.telepon,
            lulusan: this.form.lulusan,
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
      let newData = {
        nama: this.form.nama,
        email: this.form.email,
        telepon: this.form.telepon,
        lulusan: this.form.lulusan,
      };
      var url = this.$api + "/pegawai/" + this.editId;
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
      var url = this.$api + "/pegawai/" + this.deleteId;
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
      this.form.lulusan = item.lulusan;
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
        telepon: null,
        lulusan: null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
