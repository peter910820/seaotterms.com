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
          <select>
            <option class="validate" value="" disabled selected>請選擇ブランド</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
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
import axios from "axios";
import { onMounted, nextTick } from "vue";

export default defineComponent({
  setup() {
    const form = ref({
      username: "SeaotterMS",
      name: "",
      releaseDate: "",
      allAges: false,
      endDate: "",
    });
    const router = useRouter();
    onMounted(() => {
      nextTick(() => {
        var elems = document.querySelectorAll(".datepicker");
        let options = {};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
        var instances = M.Datepicker.init(elems, options);

        var elems2 = document.querySelectorAll("select");
        let options2 = {};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
        var instances2 = M.FormSelect.init(elems2, options2);
      });
    });
    const handleSubmit = async () => {
      //   try {
      //     form.value.brand = form.value.brand.trim();
      //     if (
      //       form.value.completed < 0 ||
      //       form.value.total < 0 ||
      //       form.value.completed > form.value.total
      //     ) {
      //       sessionStorage.setItem("msg", "數值有誤");
      //       router.push("/message");
      //       return;
      //     } else if (form.value.brand === "") {
      //       sessionStorage.setItem("msg", "ブランド不得為空");
      //       router.push("/message");
      //       return;
      //     }
      //     let response = await axios.post("/api/galgame-brand", form.value);
      //     sessionStorage.setItem("msg", response?.data.msg);
      //     router.push("/message");
      //   } catch (error) {
      //     if (axios.isAxiosError(error)) {
      //       sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
      //       router.push("/message");
      //     } else {
      //       console.log("未知錯誤: " + error);
      //       router.push("/notFound");
      //     }
      //   }
    };
    return {
      form,
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
