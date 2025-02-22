<template>
  <div class="mainBlock">
    <div class="col s12 center galgameBrandTitle">
      <div class="col s12">
        Galgameブランド紀錄
        <button class="button-simple">
          <router-link to="/galgamebrand/insert">點我新增</router-link>
        </button>
      </div>
    </div>
    <div class="col s12 galgameBrandHeader">
      <div class="col s3">ブランド</div>
      <div class="col s2">攻略數</div>
      <div class="col s2">總遊戲數</div>
      <div class="col s2">狀態</div>
      <div class="col s2">解散</div>
      <div class="col s1">修改</div>
    </div>
    <div
      class="col s12 galgameBrand floatup-div wow animate__bounceIn"
      v-for="galgameBrand in galgameBrandData"
      :key="galgameBrand.brand"
    >
      <div class="col s3 brand">{{ galgameBrand.brand }}</div>
      <div class="col s2">{{ galgameBrand.completed }}</div>
      <div class="col s2">{{ galgameBrand.total }}</div>
      <div class="col s2" v-if="galgameBrand.annotation === '制霸'">
        <b>
          <font color="blue">{{ galgameBrand.annotation }}</font>
        </b>
      </div>
      <div class="col s2" v-else>{{ galgameBrand.annotation }}</div>
      <div class="col s2">
        <font color="red">{{ galgameBrand.dissolution ? "解散" : "" }}</font>
      </div>
      <div class="col s1">
        <button class="button-simple">
          <router-link :to="`/galgamebrand/update/${galgameBrand.brand}`">修改</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const galgameBrandData = ref(store.state.galgameBrandData);

    return {
      galgameBrandData,
    };
  },
});
</script>

<style scoped>
.col {
  max-height: 50px;
  height: 50px;
  margin-top: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: default;
}
.mainBlock {
  padding: 25px;
}
.galgameBrandTitle {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  max-height: 100px;
  height: 100px;
  > .col {
    padding: 0px;
    margin: 0px;
    min-height: 100%;
  }
}
.galgameBrandHeader {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  max-height: 80px;
  height: 80px;
}
.galgameBrand {
  text-align: center;
  max-height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  > div {
    font-size: x-large;
    margin-left: 5px;
    padding: 0px;
    max-height: 100%;
    > button {
      padding: 0px !important;
      height: 30px;
      max-height: 30px;
      font-size: 20px;
    }
  }
}
.brand {
  font-weight: bold;
}
td {
  font-size: large;
}
a {
  color: black !important;
}
</style>
