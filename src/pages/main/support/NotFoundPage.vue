<template>
  <div class="row main-block">
    <div class="col s12 sub-block floatup-div wow animate__flipInX">
      <div class="row center-content">
        <div class="col s12 error-code">404</div>
        <div class="col s12 error-hint">Page Not Found</div>
        <div class="col s12">找不到該頁面！請確定網址輸入正確</div>
        <div class="col s12 go-home-button">
          <router-link to="/">
            <button class="button-submit" type="button">
              回到首頁
              <i class="material-icons right">home</i>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.sub-block {
  max-height: 600px;
  height: 600px;
  font-size: 60px;
  overflow: auto;
}
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 30px;
}
.error-code {
  font-size: 100px;
  font-family: "Century-Gothic";
  color: red;
}
.error-hint {
  font-size: 50px;
  margin-bottom: 20px;
  font-family: "Century-Gothic";
  color: red;
}
.go-home-button {
  margin-top: 30px;
}

/* font-settings */
@font-face {
  font-family: "Century-Gothic";
  src: url("@/assets/fonts/Century-Gothic.ttf") format("truetype");
}
</style>
