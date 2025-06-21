<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import type { TodoTopicType } from "@/types/todoTypes";
import { useSystemTodoStore } from "@/store/todo";

import { messageStorage } from "@/utils/messageHandler";

import { initMaterialDatepicker, initMaterialFormSelect } from "@/composables/useMaterial";

const router = useRouter();
const systemTodoTopics = ref<TodoTopicType[]>();
const filterValue = ref<string>("");

const getTodoTopics = async () => {
  try {
    const response = await axios.get("/api/todo-topics/system");
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

const startFilter = async () => {
  try {
    const response = await axios.get(`/api/system-todos?system_name=${filterValue.value}`);
    const store = useSystemTodoStore();
    store.set(response.data.data);
  } catch (error: unknown) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    router.push("/message");
  }
};

onMounted(async () => {
  const response = await getTodoTopics();
  if (response) {
    systemTodoTopics.value = response.data.data;
  } else {
    router.push("/message");
    return;
  }
  // init materializecss
  initMaterialDatepicker();
  initMaterialFormSelect();
});
</script>

<template>
  <!-- 嵌入其他頁面，所以不用寫main-block -->
  <div class="col s12 sub-block floatup-div">
    <div class="row">
      <div class="col s2">篩選器</div>
      <div class="col s4">
        <div class="input-field">
          <i class="material-icons prefix">text_fields</i>
          <input id="filterText" type="text" class="validate" />
          <label for="filterText">篩選文字</label>
        </div>
      </div>
      <div class="col s4">
        <div class="input-field">
          <i class="material-icons prefix">apartment</i>
          <select v-model="filterValue">
            <option class="validate" value="" disabled selected>請選擇站點</option>
            <option
              v-for="systemTodoTopic in systemTodoTopics"
              :key="systemTodoTopic.topicName"
              :value="systemTodoTopic.topicName"
            >
              {{ systemTodoTopic.topicName }}
            </option>
          </select>
          <label>站點篩選</label>
        </div>
      </div>
      <div class="col s2">
        <button class="button-submit" type="button" @click="startFilter">
          篩選
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$border-color: white;

%filter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.sub-block {
  border: 2px solid $border-color;
  border-radius: 20px;
  font-size: 25px !important;
  max-height: 100px;
  height: 150px;
}

.sub-block {
  .row {
    .col {
      @extend %filter;
    }
  }
}
</style>
