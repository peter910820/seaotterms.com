import { defineStore } from "pinia";
import { ref } from "vue";

import { GalgameBrandType, GalgameType } from "@/types/galgameTypes";

export const useGalgameBrandStore = defineStore("galgameBrand", () => {
  const galgameBrand = ref<GalgameBrandType[]>([]);
  const set = (data: GalgameBrandType[]) => {
    galgameBrand.value = data;
  };

  return {
    galgameBrand,
    set,
  };
});

export const useGalgameStore = defineStore("galgame", () => {
  const galgame = ref<GalgameType[]>([]);
  const set = (data: GalgameType[]) => {
    galgame.value = data;
  };

  return {
    galgame,
    set,
  };
});
