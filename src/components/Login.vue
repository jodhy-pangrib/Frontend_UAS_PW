<template>
  <v-main style="height: 100%">
    <div class="d-flex justify-content-center" style="margin-top: 100px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline"><b>Login</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="Password" v-model="password" type="password" :rules="passwordRules" required></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="{ path: '/register' }" style="text-decoration: none">
              <v-btn class="mr-2" color="primary" text> Register </v-btn>
            </router-link>
            <v-btn color="primary" @click="login"> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>
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
  name: "Login",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      password: "",
      passwordRules: [(v) => !!v || "Password tidak boleh kosong :("],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong :("],
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        //cek validasi data yang terkirim
        this.load = true;
        this.$http
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.user.email_verified_at == null) {
              this.error_message = "Verifikasi email terlebih dahulu";
              this.color = "red";
              this.snackbar = true;
              this.load = false;
            } else {
              //simpan data id user yang diinput
              this.error_message = response.data.message;
              this.color = "green";
              this.snackbar = true;
              this.load = false;
              localStorage.setItem("id", response.data.user.id);
              localStorage.setItem("token", response.data.access_token);
              if (this.email == "admin@gmail.com" && this.password == "admin") {
                this.clear();
                localStorage.setItem("user", "admin");
                alert("Selamat Datang Admin :)");
                this.$router.push({
                  name: "Admin | Dashboard",
                });
              } else {
                this.clear();
                localStorage.setItem("user", "user");
                alert("Login Berhasil :)");
                this.$router.push({
                  name: "Beranda",
                });
              }
            }
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset(); // clear form login
    },
  },
};
</script>
