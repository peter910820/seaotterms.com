<template>
  <div class="row">
    <div class="h4">
      <div class="headShot">
        <img src="@/assets/headshot.png" alt="" />
      </div>
    </div>
    <div class="myName">SeaotterMS</div>
    <div class="aboutMe typer"></div>
    <div class="littleItem h2">
      <a
        class="waves-effect waves-light btn-large"
        href="https://github.com/peter910820/seaotterms-site"
        >這是專案本身:pepega:</a
      >
    </div>
    <div></div>
    <div class="socialLink">
      <a
        href="https://github.com/peter910820"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i
          :class="[
            'fa-brands',
            'fa-github',
            'fa-2xl',
            { 'fa-spin': isHoveredGithub },
          ]"
          @mouseover="isHoveredGithub = true"
          @mouseleave="isHoveredGithub = false"
          style="color: #000000"
        ></i>
      </a>
      <a
        href="https://x.com/seaotterMS"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i
          :class="[
            'fa-brands',
            'fa-twitter',
            'fa-2xl',
            { 'fa-spin': isHoveredTwitter },
          ]"
          @mouseover="isHoveredTwitter = true"
          @mouseleave="isHoveredTwitter = false"
          style="color: #74c0fc"
        ></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class MyProfile extends Vue {
  isHoveredGithub = false;
  isHoveredTwitter = false;
  mounted() {
    // eslint-disable-next-line no-undef
    new Typed(".typer", {
      strings: ["一個不知道在幹嘛，每天一直假裝自己有在做事的人。"],
      typeSpeed: 80,
    });
  }
}
</script>

<style scoped>
.row {
  margin: 10px;
  /* border: 2px solid black;
  border-radius: 5px; */
  max-height: 800px;
  height: 800px;
  > div {
    max-height: 10%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > .h4 {
    max-height: 40%;
    height: 40%;
  }
  > .h2 {
    max-height: 20%;
    height: 20%;
  }
}
.headShot {
  max-height: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed orange;
  border-radius: 50%;
  > img {
    width: 100%;
    height: 100%;
  }
}
.myName {
  font-size: 35px;
}
.aboutMe {
  font-size: 20px;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
}
.socialLink {
  display: flex;
  gap: 10px;
}
.btn-large {
  width: 85%;
  background-color: black;
  border-radius: 100px / 70px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.btn-large:hover {
  background-color: rgb(100, 100, 100);
}
</style>
