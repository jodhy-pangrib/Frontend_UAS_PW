<template>
  <center>
    <NavbarCustom />
    <div style="min-height: 100vh">
      <h1>(404) Not Found!</h1>
    </div>
    <FooterCustom />
  </center>
</template>

<script>
import NavbarCustom from "../components/Navbar.vue";
import FooterCustom from "../components/Footer.vue";
export default {
  name: "NotFound",
  components: { NavbarCustom, FooterCustom },
};
</script>

<style scoped>
center {
  margin-top: 15vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}
</style>
