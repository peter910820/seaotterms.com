<template>
  <div class="row wow animate__flipInX">
    <div class="col s4">
      <img alt="" src="" />
    </div>
    <div class="col s8">
      <div class="title">article title</div>
      <div class="information">
        <i class="material-icons">upgrade</i>發表於
        <i class="material-icons">update</i>更新於
      </div>
      <div class="tag">TAG</div>
    </div>
  </div>
  <div class="row wow animate__flipInX">
    <div class="col s4"></div>
    <div class="col s8"></div>
  </div>
  <div class="row wow animate__flipInX">
    <div class="col s4"></div>
    <div class="col s8"></div>
  </div>
  <div class="row wow animate__flipInX">
    <div class="col s4"></div>
    <div class="col s8"></div>
  </div>
  <div class="row wow animate__flipInX">
    <div class="col s4"></div>
    <div class="col s8"></div>
  </div>
  <div class="row wow animate__flipInX">
    <div class="col s4"></div>
    <div class="col s8"></div>
  </div>
  <div class="row wow animate__flipInX">
    <div class="col s4"></div>
    <div class="col s8"></div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.row {
  margin: 10px;
  border: 2px solid black;
  border-radius: 5px;
}
.col {
  max-height: 180px;
  height: 180px;
  border: 2px solid black;
  border-radius: 5px;
  padding-top: 20px;
}
.col.s8 > div {
  max-height: 33%;
  height: 33%;
  overflow: hidden;
}
.title {
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title:hover {
  color: orange;
}
.information:hover {
  color: orange;
}
.tag {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
