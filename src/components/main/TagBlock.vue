<template>
  <div class="col s12 tagBlock">
    <div class="col s12">
      <h1>Linux</h1>
    </div>
    <div class="col s6">
      <div class="floatup-div wow animate__bounceIn">這是一個linux文章</div>
    </div>
    <div class="col s6">
      <div class="floatup-div wow animate__bounceIn">這是一個linux文章</div>
    </div>
    <div class="col s6">
      <div class="floatup-div wow animate__bounceIn">這是一個linux文章</div>
    </div>
    <div class="col s6">
      <div class="floatup-div wow animate__bounceIn">這是一個linux文章</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
h1 {
  text-align: center;
}
.tagBlock {
  min-height: 200px;
  margin-top: 10px;
  padding: 25px;
  > div {
    min-height: 100%;
    padding: 10px;
    div {
      font-size: 20px;
      padding: 10px;
      border: 2px solid white;
      border-radius: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
