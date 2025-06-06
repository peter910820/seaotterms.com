<template>
  <div class="myProfile">
    <div class="h4">
      <div class="headShot">
        <img v-if="userData.avatar !== '' && userData.avatar !== undefined" :src="userData.avatar" />
        <img v-else src="@/assets/headshot.png" />
      </div>
    </div>
    <div v-if="userData.username !== '' && userData.username !== undefined" class="myName">
      {{ userData.username }}
    </div>
    <div v-else class="myName"><font color="blue">使用者未登入</font></div>
    <div class="aboutMe typer"></div>
    <div class="h2">
      <a class="waves-effect waves-light btn-large" href="https://github.com/peter910820/seaotterms.com">
        這是專案本身:pepega:
      </a>
    </div>
    <div class="socialLink">
      <a href="https://github.com/peter910820" target="_blank" rel="noopener noreferrer">
        <i
          :class="['fa-brands', 'fa-github', 'fa-2xl', { 'fa-spin': isHoveredGithub }]"
          @mouseover="isHoveredGithub = true"
          @mouseleave="isHoveredGithub = false"
          style="color: #000000"
        ></i>
      </a>
      <a href="https://x.com/seaotterMS" target="_blank" rel="noopener noreferrer">
        <i
          :class="['fa-brands', 'fa-twitter', 'fa-2xl', { 'fa-spin': isHoveredTwitter }]"
          @mouseover="isHoveredTwitter = true"
          @mouseleave="isHoveredTwitter = false"
          style="color: #74c0fc"
        ></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
// pinia store
import { useUserStore } from "@/store/user";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Typed: any;

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const isHoveredGithub = ref(false);
    const isHoveredTwitter = ref(false);

    const userData = computed(() => user.value);

    onMounted(() => {
      // eslint-disable-next-line no-undef
      new Typed(".typer", {
        strings: ["一個不知道在幹嘛，每天一直假裝自己有在做事的人。"],
        typeSpeed: 100,
      });
    });

    return { isHoveredGithub, isHoveredTwitter, userData };
  },
});
</script>

<style scoped>
.myProfile {
  min-height: 100vh;
  max-height: 100vh;
  > div {
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
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
  max-height: 300px;
  height: 100%;
  max-width: 300px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed burlywood;
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
.typer {
  font-size: 18px;
}
@media (max-width: 600px) {
  .row {
    min-height: 100vh;
    max-height: 100vh;
  }
}
</style>
