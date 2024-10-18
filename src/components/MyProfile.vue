<template>
  <div class="row">
    <div>A</div>
    <div>A</div>
    <div>A</div>
    <div>A</div>
    <div class="socialLink">
      <i class="fa-brands fa-github fa-shake fa-2xl"></i>
      <i
        class="fa-brands fa-twitter fa-shake fa-2xl"
        style="color: #74c0fc"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class MyProfile extends Vue {
  msg!: string;
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
