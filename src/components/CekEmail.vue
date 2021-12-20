<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      date: null,
    };
  },
  created() {
    this.email = this.$route.params.email;
    this.password = this.$route.params.password;
    this.date = this.$route.params.date;
    if (this.email != null && this.password != null && this.date != null) {
      this.$http
        .post(this.$api + "/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.user.email_verified_at == null) {
            var token = response.data.access_token;
            this.$http
              .put(
                this.$api + "/date/" + response.data.user.id,
                {
                  date: this.date,
                },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .then((response) => {
                alert(response.data.message);
                this.$router.push({
                  name: "Login",
                });
              })
              .catch((error) => {
                alert(error.response.data.message);
              });
          } else {
            alert("Link sudah tidak berlaku!");
            this.$router.push({
              name: "Beranda",
            });
          }
        });
    } else {
      this.$router.push({
        name: "Not Found",
      });
    }
  },
};
</script>
