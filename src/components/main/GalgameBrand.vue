<template>
  <div class="mainBlock">
    <div class="col s12 center">
      <h1>Galgameブランド紀錄</h1>
    </div>
    <div class="col s12 galgameBrandInsert">
      <button class="button-simple">
        <router-link to="/galgamebrand/insert">點我新增</router-link>
      </button>
    </div>
    <div class="col s12 galgameBrandHeader">
      <div class="col s3">ブランド</div>
      <div class="col s1">攻略數</div>
      <div class="col s2">總遊戲數</div>
      <div class="col s2">狀態</div>
      <div class="col s2">解散</div>
      <div class="col s2">修改</div>
    </div>
    <div
      class="col s12 galgameBrand floatup-div wow animate__bounceIn"
      v-for="galgameBrand in galgameBrandData"
      :key="galgameBrand.brand"
    >
      <div class="col s3 brand">{{ galgameBrand.brand }}</div>
      <div class="col s1">{{ galgameBrand.completed }}</div>
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
      <div class="col s2 right">
        <button class="button-simple">
          <router-link :to="`/galgamebrand/update/${galgameBrand.brand}`">
            我修改API還沒寫QQ
          </router-link>
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
  max-height: 150px;
  height: 150px;
  padding-top: 20px;
  margin-top: 10px;
}
.mainBlock {
  padding: 25px;
}
.galgameBrandHeader {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  max-height: 100%;
}
.galgameBrandInsert {
  text-align: center;
  max-height: 50px;
  height: 50px;
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
  }
  > .right {
    text-align: right;
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
