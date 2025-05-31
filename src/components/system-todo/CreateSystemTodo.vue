<template>
  <div class="row main-block">
    <h1>建立系統建議</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="col s4 input-field mobile-hidden">
          <select v-model="form.systemName">
            <option class="validate" value="" disabled selected>選擇站台</option>
            <option
              v-for="todoTopic in systemTodoTopics"
              :key="todoTopic.topicName"
              :value="`${todoTopic.topicName}/system`"
            >
              {{ todoTopic.topicName }}
            </option>
          </select>
          <label>選擇站台</label>
        </div>
        <div class="col s4 input-field mobile-display">
          <select v-model="form.systemName" class="browser-default">
            <option class="validate" value="" disabled selected>選擇站台</option>
            <option
              v-for="todoTopic in systemTodoTopics"
              :key="todoTopic.topicName"
              :value="`${todoTopic.topicName}/system`"
            >
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
          <textarea id="detail" class="materialize-textarea"></textarea>
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
        <div class="col s9 input-field">
          <i class="material-icons prefix">browse_gallery</i>
          <input id="deadline" type="text" class="datepicker validate" />
          <label for="deadline">截止日期</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useStore } from "vuex";
import axios from "axios";

import { initMaterialDatepicker, initMaterialFormSelect, initMaterialDropdown } from "@/composables/useMaterial";

import type { TodoTopicType } from "@/types/todoTypes";
import type { SystemTodoForm } from "@/types/FormTypes";

export default defineComponent({
  setup() {
    const router = useRouter();
    const form = ref<SystemTodoForm>({
      systemName: "",
      title: "",
      detail: "",
      status: 0,
      deadline: new Date(),
      urgency: 0,
    });
    const systemTodoTopics = ref<TodoTopicType[]>();

    onMounted(async () => {
      // get TodoTopics
      const getTodoTopics = async () => {
        try {
          const response = await axios.get("/api/todo-topics/system");
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error.response;
        }
      };

      // get todo topic
      let response = await getTodoTopics();
      if (response?.status === 200) {
        systemTodoTopics.value = response.data.data;
      } else {
        sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
        router.push("/message");
      }

      // init materializecss
      initMaterialDatepicker();
      initMaterialDropdown();
      initMaterialFormSelect();
    });

    return {
      form,
      systemTodoTopics,
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
