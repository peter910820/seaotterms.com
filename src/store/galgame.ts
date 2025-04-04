import { defineStore } from "pinia";
import { ref } from "vue";

import { GalgameBrandType } from "@/types/galgameTypes";

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
