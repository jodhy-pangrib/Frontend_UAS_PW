import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

function importLayout(path) {
  return () => import(`./view/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: importLayout("User"),
      children: [
        {
          path: "/",
          component: importComponent("Beranda"),
          name: "Beranda",
          meta: { title: "Beranda" },
        },
        {
          path: "/tentangkami",
          component: importComponent("TentangKami"),
          name: "TentangKami",
          meta: { title: "TentangKami" },
        },
        {
          path: "/hargapaket",
          component: importComponent("HargaPaket"),
          name: "HargaPaket",
          meta: { title: "HargaPaket" },
        },
        {
          path: "/pemesanan",
          component: importComponent("Pemesanan"),
          name: "Pemesanan",
          meta: { title: "Pemesanan" },
        },
        {
          path: "/kontak",
          component: importComponent("Kontak"),
          name: "Kontak",
          meta: { title: "Kontak" },
        },
        {
          path: "/login",
          component: importComponent("Login"),
          name: "Login",
          meta: { title: "Login" },
        },
        {
          path: "/register",
          component: importComponent("Register"),
          name: "Register",
          meta: { title: "Register" },
        },
        {
          path: "/profil",
          component: importComponent("Profil"),
          name: "Profil",
          meta: { title: "Profil" },
        },
      ],
    },
    {
      path: "/dashboard",
      name: "Admin",
      meta: { title: "Admin" },
      component: importComponent("Admin/DashboardLayout"),
      children: [
        //Dashboard
        {
          path: "/dashboard",
          name: "Admin | Dashboard",
          meta: { title: "Dashboard" },
          component: importComponent("Admin/Dashboard"),
        },
        // Courses
        {
          path: "/user",
          name: "Admin | User",
          meta: { title: "User" },
          component: importComponent("Admin/User"),
        },
        {
          path: "/promo",
          name: "Admin | Promo",
          meta: { title: "Promo" },
          component: importComponent("Admin/Promo"),
        },
        {
          path: "/pegawai",
          name: "Admin | Pegawai",
          meta: { title: "Pegawai" },
          component: importComponent("Admin/Pegawai"),
        },
        {
          path: "/order",
          name: "Admin | Order",
          meta: { title: "Order" },
          component: importComponent("Admin/Order"),
        },
      ],
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") == null) {
          next("Login");
          document.to.meta.title = "Login";
        } else if (localStorage.getItem("user") != "admin") {
          next("/");
          document.to.meta.title = "Beranda";
        } else next();
      },
    },
    {
      path: "/cek/:email/:password/:date",
      component: importComponent("CekEmail"),
      name: "CekEmail",
      meta: { title: "CekEmail" },
    },
    {
      path: "*",
      name: "Not Found",
      component: importComponent("404"),
    },
  ],
});

//Set Judul
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
