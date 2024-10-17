<template>
  <div class="row">
    <div class="col s4"></div>
    <div class="col s8">
      <div class="title">我的第一篇文章</div>
      <div class="information">B</div>
      <div class="tag">C</div>
    </div>
  </div>
  <div class="row">
    <div class="col s4"></div>
    <div class="col s8"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class MainPage extends Vue {
  msg!: string
}
</script>

<style scoped>
.row{
  margin: 10px;
}
.col{
    max-height: 180px;
    height: 180px;
    border: 2px solid black;
    border-radius: 5px;
    padding-top: 20px;
}
.col.s8 div{
  max-height: 33%;
  height: 33%;
}
.title{
  overflow: hidden;
  font-size: 20px;
  text-overflow: ellipsis;
}
.title:hover{
  color: orange;
}
</style>
