import { defineStore } from "pinia";
import { ref } from "vue";

import { TodoType, TodoTopicType } from "@/types/todoTypes";

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
  const systemTodo = ref<TodoType[]>([]);
  const set = (data: TodoType[]) => {
    systemTodo.value = data;
  };

  return {
    systemTodo,
    set,
  };
});
