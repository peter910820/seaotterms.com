<template>
  <div class="mainBlock">
    <h1>代辦清單</h1>
    <div class="col s12 sub-block floatup-div wow animate__bounceIn">
      <div class="input-field">
        <select>
          <option value="" disabled selected>選擇主題</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <label>選擇主題</label>
      </div>
      <div class="input-field">
        <input id="first_name" type="text" class="validate" />
        <label for="first_name">First Name</label>
      </div>
    </div>

    <div class="col s12 sub-block floatup-div wow animate__bounceIn">
      <label>
        <input type="checkbox" class="large" />
        <span class="title">[系統]測試資料</span>
      </label>
    </div>
    <div class="col s12 sub-block floatup-div wow animate__bounceIn">
      <label>
        <input type="checkbox" class="large" />
        <span class="title">[系統]測試資料</span>
      </label>
    </div>
    <div class="col s12 sub-block floatup-div wow animate__bounceIn">
      <label>
        <input type="checkbox" class="large" />
        <span class="title">[系統]測試資料</span>
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { onMounted, nextTick } from "vue";
export default defineComponent({
  setup() {
    // init select for materializecss
    onMounted(() => {
      nextTick(() => {
        var elems = document.querySelectorAll("select");
        let options = {
          dropdownOptions: {
            constrainWidth: false,
            alignment: "left",
            container: document.body,
          },
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
        var instances2 = M.FormSelect.init(elems, options);
      });
    });
    return {};
  },
});
</script>

<style scoped>
.col {
  display: flex;
  max-height: 100px;
  height: 150px;
  padding-top: 30px;
  padding-left: 10px;
  margin-top: 10px;
  cursor: default;
}
.mainBlock {
  padding: 25px;
}
.title {
  font-size: 25px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  color: black;
}
label {
  display: flex;
  width: 100%;
  height: 100%;
}
.sub-block {
  border: 2px solid white;
  border-radius: 20px;
  > .title {
    font-size: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
div {
  margin-top: 10px;
}
/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
