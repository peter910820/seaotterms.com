import { defineStore } from "pinia";
import { ref } from "vue";

import { TodoType, TodoTopicType, SystemTodoType } from "@/types/todoTypes";

export const useTodoStore = defineStore("todo", () => {
  const todo = ref<TodoType[]>([]);
  const set = (data: TodoType[]) => {
    todo.value = data;
  };

  return {
    todo,
    set,
  };
});

export const useTodoTopicStore = defineStore("todoTopic", () => {
  const todoTopic = ref<TodoTopicType[]>([]);
  const set = (data: TodoTopicType[]) => {
    todoTopic.value = data;
  };

  return {
    todoTopic,
    set,
  };
});

export const useSystemTodoStore = defineStore("systemTodo", () => {
  const systemTodo = ref<SystemTodoType[]>([]);
  const systemTodoSingle = ref<SystemTodoType | null>(null); // for details
  const set = (data: SystemTodoType[]) => {
    systemTodo.value = data;
  };
  const setSingle = (data: SystemTodoType[] | null) => {
    if (!data || data.length === 0) {
      systemTodoSingle.value = null;
    } else {
      systemTodoSingle.value = data[0];
    }
  };

  return {
    systemTodo,
    set,
    systemTodoSingle,
    setSingle,
  };
});
