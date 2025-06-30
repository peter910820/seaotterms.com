<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
// pinia store
import type { ArticleTag } from "@/types/FormTypes";

import { messageStorage } from "@/utils/messageHandler";

export default defineComponent({
  setup() {
    const router = useRouter();
    const form = ref<ArticleTag>({
      name: "",
      iconName: "",
    });

    const handleSubmit = async () => {
      if (form.value.name.trim() === "") {
        alert("標題不得為空");
        return;
      }

      try {
        const response = await axios.post("", form.value);
        messageStorage(response.status, response.data.msg);
      } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
        messageStorage(status, msg);
      } finally {
        router.push("/message");
      }
    };
    return {
      form,
      handleSubmit,
    };
  },
});
</script>

<template>
  <div class="row main-block">
    <h1>建立文章Tag</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="name" v-model="form.name" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="name">name</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="iconName" v-model="form.iconName" type="text" class="validate" />
          <span class="helper-text" data-error="" data-success=""></span>
          <label for="iconName">iconName</label>
        </div>
        <div class="col s12">
          <button @click="handleSubmit" class="button-submit" type="button">
            建立文章Tag
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sub-block {
  min-height: 300px;
  height: auto;
}
</style>
