<template>
  <div class="row wow animate__flipInX">
    <h1>Galgameブランド新增</h1>
    <form class="col s12" method="post" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">apartment</i>
          <input id="brand" v-model="form.brand" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="brand">ブランド</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">done_outline</i>
          <input id="completed" v-model="form.completed" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="completed">Completed</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">format_list_bulleted</i>
          <input id="total" v-model="form.total" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="total">Total</label>
        </div>
        <div class="input-field col s6">
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="form.dissolution" />
              <span>解散</span>
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

export default defineComponent({
  setup() {
    const form = ref({
      brand: "",
      username: "SeaotterMS",
      completed: 0,
      total: 0,
      dissolution: false,
    });
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        form.value.brand = form.value.brand.trim();
        if (
          form.value.completed < 0 ||
          form.value.total < 0 ||
          form.value.completed > form.value.total
        ) {
          sessionStorage.setItem("msg", "數值有誤");
          router.push("/message");
          return;
        } else if (form.value.brand === "") {
          sessionStorage.setItem("msg", "ブランド不得為空");
          router.push("/message");
          return;
        }

        let response = await axios.post("/api/galgame-brand", form.value);
        sessionStorage.setItem("msg", response?.data.msg);
        router.push("/message");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
          router.push("/message");
        } else {
          console.log("未知錯誤: " + error);
          router.push("/notFound");
        }
      }
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
