<template>
  <v-main style="height: 100%">
    <div class="d-flex justify-content-center" style="margin-top: 100px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline"><b>Register</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>
              <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
              <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" required></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit"> Register </v-btn>
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
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      name: "",
      nameRules: [(v) => !!v || "Name tidak boleh kosong :("],
      password: "",
      passwordRules: [(v) => !!v || "Password tidak boleh kosong :("],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong :("],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek validasi data yang terkirim
        this.load = true;
        this.$http
          .post(this.$api + "/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            //simpan data id user yang diinput
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            alert(response.data.message);
            this.$router.push({
              name: "Login",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
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
