<template>
  <div class="row main-block">
    <h1>建立系統代辦</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="col s4 input-field mobile-hidden">
          <select v-model="form.systemName">
            <option class="validate" value="" disabled selected>選擇站台</option>
            <option v-for="todoTopic in systemTodoTopics" :key="todoTopic.topicName" :value="todoTopic.topicName">
              {{ todoTopic.topicName }}
            </option>
          </select>
          <label>選擇站台</label>
        </div>
        <div class="col s4 input-field mobile-display">
          <select v-model="form.systemName" class="browser-default">
            <option class="validate" value="" disabled selected>選擇站台</option>
            <option v-for="todoTopic in systemTodoTopics" :key="todoTopic.topicName" :value="todoTopic.topicName">
              {{ todoTopic.topicName }}
            </option>
          </select>
        </div>
        <!-- title -->
        <div class="col s8 input-field">
          <input v-model="form.title" id="title" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="title">標題</label>
        </div>
        <div class="input-field col s12">
          <textarea v-model="form.detail" id="detail" class="materialize-textarea"></textarea>
          <label for="detail">詳細資訊</label>
        </div>
        <!-- urgency -->
        <div class="col s3 input-field mobile-hidden">
          <select v-model="form.urgency">
            <option class="validate" :value="0" selected>普通</option>
            <option class="validate" :value="1" selected>高優先度</option>
            <option class="validate" :value="2" selected>緊急</option>
          </select>
          <label>選擇急迫度</label>
        </div>
        <div class="col s3 input-field mobile-display">
          <select v-model="form.urgency" class="browser-default">
            <option class="validate" :value="0" selected>普通</option>
            <option class="validate" :value="1" selected>高優先度</option>
            <option class="validate" :value="2" selected>緊急</option>
          </select>
        </div>
        <!-- deadline -->
        <div class="col s7 input-field">
          <i class="material-icons prefix">browse_gallery</i>
          <input v-model="form.deadline" id="deadline" type="text" class="datepicker validate" />
          <label for="deadline">截止日期</label>
        </div>
        <div class="col s2 submit">
          <button class="button-submit" type="button" @click="handleSubmit">
            建立
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { initMaterialDatepicker, initMaterialFormSelect, initMaterialDropdown } from "@/composables/useMaterial";
// pinia store
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import type { TodoTopicType } from "@/types/todoTypes";
import type { SystemTodoForm } from "@/types/FormTypes";

import { messageStorage } from "@/utils/messageHandler";

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const form = ref<SystemTodoForm>({
      systemName: "",
      title: "",
      detail: "",
      status: 0,
      deadline: "",
      urgency: 0,
      createdName: user.value.username,
    });
    const systemTodoTopics = ref<TodoTopicType[]>();

    onMounted(async () => {
      // get TodoTopics
      const getTodoTopics = async () => {
        try {
          const response = await axios.get(process.env.VUE_APP_API_URL + "api/todo-topics/system");
          messageStorage(response.status, response.data.msg);
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const status = axios.isAxiosError(error) ? error.response?.status : undefined;
          const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
          messageStorage(status, msg);
          return null;
        }
      };

      // get todo topic
      let response = await getTodoTopics();
      if (response) {
        systemTodoTopics.value = response.data.data;
      } else {
        router.push("/message");
        return;
      }

      // init materializecss
      initMaterialDatepicker();
      initMaterialDropdown();
      initMaterialFormSelect();
    });

    const handleSubmit = async () => {
      const deadlineTag = document.getElementById("deadline") as HTMLInputElement | null;
      if (deadlineTag) {
        form.value.deadline = deadlineTag.value;
      } else {
        // 找不到ID為deadline的HTML元素
        messageStorage();
        router.push("/message");
        return;
      }
      if ((form.value.deadline ?? "").trim() !== "") {
        const dateStr = form.value.deadline + "T00:00:00Z";
        const timestamp = Date.parse(dateStr);

        if (isNaN(timestamp)) {
          alert("日期格式錯誤");
          return;
        }
        form.value.deadline = dateStr;
      } else {
        form.value.deadline = null;
      }
      if (form.value.title.trim() === "" || form.value.systemName === "") {
        alert("請確保標題以及站台有正確填寫");
        return;
      }

      try {
        const response = await axios.post(process.env.VUE_APP_API_URL + "api/system-todos", form.value);
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
      systemTodoTopics,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.sub-block {
  font-size: 25px !important;
  min-height: 300px;
}

/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
