<template>
  <div class="row wow animate__flipInX">
    <h1>遊玩完畢Galgame新增</h1>
    <form class="col s12" method="post" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="form.name" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">ゲーム</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">apartment</i>
          <select v-model="form.brand">
            <option class="validate" value="" disabled selected>請選擇ブランド</option>
            <option v-for="item in galgameBrandData" :key="item.brand" :value="item.brand">
              {{ item.brand }}
            </option>
          </select>
          <label>ブランド</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">event</i>
          <input id="releaseDate" type="text" class="datepicker validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="releaseDate">発売日</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">check_circle</i>
          <input id="endDate" type="text" class="datepicker validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="endDate">遊玩結束時間</label>
        </div>
        <div class="input-field col s6">
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="form.allAges" />
              <span>全年齡</span>
            </label>
          </p>
        </div>
        <div class="col s12">
          <button class="btn waves-effect waves-light" type="submit" name="action">
            新增
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
import axios from "axios";

import { initMaterialDatepicker, initMaterialFormSelect } from "@/composables/useMaterial";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const galgameBrandData = ref(store.state.galgameBrandData);
    const form = ref({
      username: store.state.userData.username,
      name: "",
      brand: "",
      releaseDate: "",
      allAges: false,
      endDate: "",
    });

    onMounted(() => {
      // init select for materializecss
      initMaterialDatepicker();
      initMaterialFormSelect();
    });

    const handleSubmit = async () => {
      if (form.value.name.trim() == "") {
        sessionStorage.setItem("msg", "遊戲名稱不得為空白");
        router.push("/message");
        return;
      }
      if (form.value.brand.trim() == "") {
        sessionStorage.setItem("msg", "請選擇品牌名稱");
        router.push("/message");
        return;
      }
      const releaseDate = new Date(document.getElementById("releaseDate").value).toISOString();
      const endDate = new Date(document.getElementById("endDate").value).toISOString();
      if (endDate <= releaseDate) {
        sessionStorage.setItem("msg", "輸入日期不正確");
        router.push("/message");
        return;
      }
      form.value.releaseDate = releaseDate;
      form.value.endDate = endDate;
      try {
        let response = await axios.post("/api/galgame", form.value);
        sessionStorage.setItem("msg", response?.data.msg);
        router.push("/message");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
          router.push("/message");
        } else {
          console.log("未知錯誤: " + error);
          sessionStorage.setItem("msg", `發生未知錯誤，請聯繫管理員`);
          router.push("/message");
        }
      }
    };
    return {
      form,
      galgameBrandData,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.row {
  padding: 50px;
}
</style>
