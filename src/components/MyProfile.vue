<template>
  <div class="row">
    <div>A</div>
    <div>A</div>
    <div>A</div>
    <div>A</div>
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
}
</script>

<style scoped>
.row {
  margin: 10px;
  border: 2px solid black;
  border-radius: 5px;
  max-height: 380px;
  height: 380px;
}
.row > div {
  max-height: 20%;
  height: 20%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.socialLink {
  display: flex;
  gap: 10px;
}
</style>
