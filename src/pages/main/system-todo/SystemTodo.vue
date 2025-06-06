<template>
  <div class="row main-block">
    <h1>系統更新待辦</h1>
    <div
      class="col s12 sub-block floatup-div wow animate__slideInUp"
      v-for="systemTodo in systemTodos"
      :key="systemTodo.id"
    >
      <div :class="['col', systemTodo.deadline ? 's6' : 's9', 'todo-title']">
        [{{ systemTodo.systemName }}]{{ systemTodo.title }}
      </div>

      <div v-if="systemTodo.deadline" class="col s3 todo-date">
        {{ new Date(systemTodo.deadline).toISOString().slice(0, 10) }}
      </div>

      <div v-if="systemTodo.status === 0" :class="['col', systemTodo.deadline ? 's2' : 's2', 'todo-status']">
        <font color="red">未開始</font>
      </div>
      <div v-else-if="systemTodo.status === 1" :class="['col', systemTodo.deadline ? 's2' : 's2', 'todo-status']">
        <font color="blue">進行中</font>
      </div>
      <div v-else-if="systemTodo.status === 2" :class="['col', systemTodo.deadline ? 's2' : 's2', 'todo-status']">
        <font color="purple">擱置中</font>
      </div>
      <div v-else-if="systemTodo.status === 3" :class="['col', systemTodo.deadline ? 's2' : 's2', 'todo-status']">
        <font color="green">已完成</font>
      </div>
      <div v-else class="col s2 todo-status">?</div>
      <div class="col s1">
        <span class="button-status" @click="openModal(systemTodo.id)">+</span>
      </div>
    </div>
  </div>

  <!-- 全螢幕彈出視窗 -->
  <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
    <div v-if="systemTodoSingle !== null" class="modal-content" @click.stop>
      <h4>詳細資料</h4>
      <div class="col s12 left-align">{{ systemTodoSingle.detail }}</div>
      <div v-if="systemTodoSingle.urgency === 0" class="col s12 left-align">普通</div>
      <div v-else-if="systemTodoSingle.urgency === 1" class="col s12 left-align">高優先度</div>
      <div v-else-if="systemTodoSingle.urgency === 2" class="col s12 left-align">緊急</div>
      <div v-else class="col s12 left-align">?</div>
      <!-- todo-button -->
      <div v-if="userData?.management" class="col s12 todo-button">
        <span
          :class="['button-status', systemTodoSingle.status == 0 ? 'background-n' : '']"
          @click="changeStatus(systemTodoSingle.id, 0)"
        >
          N
        </span>
        <span
          :class="['button-status', systemTodoSingle.status == 1 ? 'background-p' : '']"
          @click="changeStatus(systemTodoSingle.id, 1)"
        >
          P
        </span>
        <span
          :class="['button-status', systemTodoSingle.status == 2 ? 'background-s' : '']"
          @click="changeStatus(systemTodoSingle.id, 2)"
        >
          S
        </span>
        <span
          :class="['button-status', systemTodoSingle.status == 3 ? 'background-c' : '']"
          @click="changeStatus(systemTodoSingle.id, 3)"
        >
          C
        </span>
        <span class="button-status background-e" @click="goToEditPage(systemTodoSingle.id)">修</span>
        <span class="button-status background-d" @click="deleteTodo(systemTodoSingle.id)">D</span>
      </div>
    </div>
    <div v-else class="modal-content" @click.stop>
      <font color="red">查無資料，請聯繫管理員</font>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useSystemTodoStore } from "@/store/todo";
import { storeToRefs } from "pinia";
import axios from "axios";
// pinia store
import { useUserStore } from "@/store/user";

import router from "@/router";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const modalVisible = ref(false);
    const userData = computed(() => user.value);
    const systemTodoStore = useSystemTodoStore();
    const { systemTodo, systemTodoSingle } = storeToRefs(systemTodoStore);
    const systemTodos = computed(() => systemTodo.value); // redundant

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openModal = async (id: number) => {
      // refresh user data and check login
      try {
        let response = await axios.get("/api/auth");
        userStore.set(response?.data.userData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          userStore.reset();
          alert("使用者尚未登入, 請前往登入");
          router.push("/login");
        } else {
          sessionStorage.setItem("msg", String(error));
          router.push("/message");
        }
      }

      try {
        let response = await axios.get(`/api/system-todos?id=${id}`);
        systemTodoStore.setSingle(response.data.data);
        systemTodoStore.setSingle(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`${error.response?.status}: ${error.response?.data.msg}`);
          systemTodoStore.setSingle(null);
        } else {
          console.log("未知錯誤: " + error);
          systemTodoStore.setSingle(null);
        }
      }
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    const changeStatus = async (id: number, status: number) => {
      let statusText = "";
      switch (status) {
        case 0:
          statusText = "未開始";
          break;
        case 1:
          statusText = "進行中";
          break;
        case 2:
          statusText = "擱置中";
          break;
        case 3:
          statusText = "已完成";
          break;
      }
      if (confirm(`確定調整狀態為${statusText}?`)) {
        await axios.patch(`/api/system-todos/quick/${id}`, { status: status, updatedName: userData.value.username });
        let response = await axios.get(`/api/system-todos?id=${id}`);
        systemTodoStore.setSingle(response.data.data);
        response = await axios.get(`/api/system-todos`);
        systemTodoStore.set(response.data.data);
      }
    };
    const goToEditPage = async (id: number) => {
      window.location.href = `/system-todo/edit/${id}`;
      return;
    };

    const deleteTodo = async (id: number) => {
      if (confirm("確定刪除?")) {
        await axios.delete(`/api/system-todos/${id}`);
        let response = await axios.get(`/api/system-todos?id=${id}`);
        systemTodoStore.setSingle(response.data.data);
        response = await axios.get(`/api/system-todos`);
        systemTodoStore.set(response.data.data);
      }
    };

    return {
      systemTodos,
      openModal,
      closeModal,
      modalVisible,
      systemTodoSingle,
      changeStatus,
      deleteTodo,
      userData,
      goToEditPage,
    };
  },
});
</script>

<style scoped>
.sub-block {
  font-size: 25px !important;
  max-height: 100px;
  height: 150px;
}
@media (max-width: 768px) {
  .sub-block {
    font-size: 20px !important;
    max-height: 100px;
    height: 150px;
  }
}
.todo-title {
  text-align: left;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
.todo-date {
  text-align: center;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  color: olive;
}
.todo-status {
  text-align: right;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  height: 75vh;
  width: 75vw;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f2ebea;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.background-n {
  background: linear-gradient(to bottom right, red, #ff2f13);
}
.background-p {
  background: linear-gradient(to bottom right, blue, #287be9);
}
.background-s {
  background: linear-gradient(to bottom right, purple, #9848f3);
}
.background-c {
  background: linear-gradient(to bottom right, green, #35fc4f);
}
.background-e {
  background: linear-gradient(to bottom right, skyblue, #79e5e9);
}
.background-d {
  background: linear-gradient(to bottom right, black, #222121);
}
/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
