<template>
  <div class="row wow animate__flipInX">
    <h1>Galgameブランド紀錄</h1>
    <table>
      <thead>
        <tr>
          <th>ブランド</th>
          <th>攻略數</th>
          <th>總遊戲數</th>
          <th>狀態</th>
          <th>解散</th>
          <th>修改</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="galgameBrand in galgameBrandData" :key="galgameBrand.Brand">
          <td>
            <b>{{ galgameBrand.brand }}</b>
          </td>
          <td>
            <b>{{ galgameBrand.completed }}</b>
          </td>
          <td>
            <b>{{ galgameBrand.total }}</b>
          </td>

          <td v-if="galgameBrand.annotation === '制霸'">
            <b>
              <font color="blue">{{ galgameBrand.annotation }}</font>
            </b>
          </td>
          <td v-else>{{ galgameBrand.annotation }}</td>

          <td>
            <font color="red">{{ galgameBrand.dissolution ? "解散" : "" }}</font>
          </td>
          <td>
            <button class="button-simple">
              <router-link :to="`/galgamebrand/update/${galgameBrand.brand}`">
                我API還沒寫QQ
              </router-link>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="button-simple">
      <router-link to="/galgamebrand/insert">新增</router-link>
    </button>
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
.row {
  height: 800px;
  padding: 50px;
}
td {
  font-size: large;
}
a {
  color: black !important;
}
</style>
