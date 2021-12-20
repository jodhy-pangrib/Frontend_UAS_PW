<template>
  <div class="footer">
    <footer class="text-center text-lg-start">
      <div class="container d-flex justify-content-center py-3 pe-4">
        <a href="https://facebook.com" target="”_blank”">
          <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="border: none">
            <ion-icon name="logo-facebook" style="color: white"></ion-icon>
          </button>
        </a>
        <a href="https://youtube.com" target="”_blank”">
          <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="border: none">
            <ion-icon name="logo-youtube" style="color: white"></ion-icon>
          </button>
        </a>
        <a href="https://instagram.com" target="_blank">
          <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="border: none">
            <ion-icon name="logo-instagram" style="color: white"></ion-icon>
          </button>
        </a>
        <a href="https://twitter.com" target="_blank">
          <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="border: none">
            <ion-icon name="logo-twitter" style="color: white"></ion-icon>
          </button>
        </a>
      </div>

      <div class="text-center text-white pt-3 pb-3 ps-3 copyright" style="padding-right: 1.75rem">© 2021 Copyright: All Rights Reserved</div>
    </footer>
  </div>
</template>

<style scoped>
footer {
  background-color: #03045e;
  width: 100%;
  margin-top: auto;
}
footer .btn,
footer .copyright {
  background-color: rgba(0, 0, 0, 0.2);
}
ion-icon {
  font-size: 16px;
}
</style>
