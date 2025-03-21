// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const M: any;

import { nextTick } from "vue";

export function initMaterialDatepicker() {
  nextTick(() => {
    const datepickerElements = document.querySelectorAll(".datepicker");
    const datepickerOptions = {
      format: "yyyy-mm-dd",
      container: document.body,
    };
    M.Datepicker.init(datepickerElements, datepickerOptions);
  });
}

export function initMaterialDropdown() {
  nextTick(() => {
    const selectElements = document.querySelectorAll("select");
    const selectOptions = {
      dropdownOptions: {
        constrainWidth: false,
        container: document.body,
      },
    };
    M.FormSelect.init(selectElements, selectOptions);
  });
}
