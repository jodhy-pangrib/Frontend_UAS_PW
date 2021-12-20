<template>
  <div class="user" style="height: 100%">
    <NavbarCustom />
    <router-view></router-view>
    <FooterCustom />
  </div>
</template>

<script>
import NavbarCustom from "../components/Navbar.vue";
import FooterCustom from "../components/Footer.vue";
export default {
  name: "User",
  components: { NavbarCustom, FooterCustom },
};
</script>
