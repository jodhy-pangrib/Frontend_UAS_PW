<template>
  <v-main class="profil" style="height: 100%">
    <div class="d-flex justify-content-center mt-16">
      <v-card persistent min-width="400px" elevation="8">
        <v-card-title class="backgroundhead">
          <span class="headline"><b>Profil</b></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="form.name" readonly label="Name"></v-text-field>

            <v-text-field v-model="form.email" readonly label="Email"></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="open"> Ganti Password </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="dialog" persistent width="400px">
      <v-card>
        <v-card-title>
          <span class="headLine">Ganti Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="form_password.old" label="Old Password" type="password" required></v-text-field>
            <v-text-field v-model="form_password.new" label="New Password" type="password" required></v-text-field>
            <v-text-field v-model="form_password.confirm" label="Confirm Password" type="password" required></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="ganti"> Ganti </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }} </v-snackbar>
  </v-main>
</template>

<style scoped>
.backgroundhead {
  background-color: #d0d0d0;
}
</style>

<script>
export default {
  name: "Profil",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      dialog: false,
      form: {
        name: null,
        email: null,
        password: null,
      },
      form_password: {
        old: null,
        new: null,
        confirm: null,
      },
    };
  },
  methods: {
    readData() {
      var url = this.$api + "/user/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.form.name = response.data.data.name;
          this.form.email = response.data.data.email;
          this.form.password = response.data.data.password;
        });
    },
    cancel() {
      this.resetFormPassword();
      this.readData();
      this.dialog = false;
    },
    resetForm() {
      this.form = {
        name: null,
        email: null,
        password: null,
      };
    },
    resetFormPassword() {
      this.form_password = {
        old: null,
        new: null,
        confirm: null,
      };
    },
    open() {
      this.dialog = true;
    },
    ganti() {
      let newData = {
        old: this.form_password.old,
        new: this.form_password.new,
        confirm: this.form_password.confirm,
      };
      var url = this.$api + "/update_password/" + localStorage.getItem("id");
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
          this.dialog = false;
          this.resetFormPassword();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
