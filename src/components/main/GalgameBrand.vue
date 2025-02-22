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
        </tr>
      </thead>
      <tbody>
        <tr v-for="galgameBrand in galgameBrandData" :key="galgameBrand.Brand">
          <td>{{ galgameBrand.brand }}</td>
          <td>{{ galgameBrand.completed }}</td>
          <td>{{ galgameBrand.total }}</td>
          <td>{{ galgameBrand.annotation }}</td>
          <td>{{ galgameBrand.dissolution ? "解散" : "" }}</td>
        </tr>
      </tbody>
    </table>
    <button><router-link to="/galgamebrand/insert">新增</router-link></button>
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
</style>
