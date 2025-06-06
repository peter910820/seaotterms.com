<template>
  <div class="row main-block">
    <h1>Galgame文章作業(公式計算)</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="col s12"><font color="red">*請輸入1~10的數值，每一級距為0.5</font></div>
        <div class="col s12 title"><font color="blue">OP:</font></div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.opSong" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">OP歌曲</label>
        </div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.opAnimation" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">OP畫面</label>
        </div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.opCompatibility" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">OP畫面與歌曲契合度</label>
        </div>
        <div class="col s12 title"><font color="blue">其他:</font></div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.ed" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">ED</label>
        </div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.theme" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">題材</label>
        </div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.music" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">音樂</label>
        </div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.drama" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">劇本</label>
        </div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.art" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">美術</label>
        </div>
        <div class="input-field col s4">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="recordData.system" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">系統</label>
        </div>
        <div class="input-field col s4">
          <select v-model="recordData.recommended">
            <option class="validate" value="" disabled selected>選擇個人推薦程度</option>
            <option class="validate" value="大推" selected>大推</option>
            <option class="validate" value="推" selected>推</option>
            <option class="validate" value="普" selected>普</option>
            <option class="validate" value="不推" selected>不推</option>
          </select>
        </div>
        <div class="input-field col s8">
          <span class="result-data">{{ resultData }}</span>
        </div>
        <div class="col s12">
          <button class="button-submit" type="button" @click="handleCalculate">
            計算
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { onMounted } from "vue";

import { initMaterialDatepicker, initMaterialFormSelect } from "@/composables/useMaterial";

export default defineComponent({
  setup() {
    const recordData = ref({
      opSong: 8,
      opAnimation: 8,
      opCompatibility: 8,
      ed: 8,
      theme: 8,
      music: 8,
      drama: 8,
      art: 8,
      system: 8,
      recommended: "普",
    });

    const resultData = ref(0);

    onMounted(() => {
      // init select for materializecss
      initMaterialDatepicker();
      initMaterialFormSelect();
    });

    const handleCalculate = () => {
      const isAllGreaterThanZero = Object.entries(recordData.value)
        .filter(([key]) => key !== "recommended")
        .every(([, value]) => value >= 1);
      if (isAllGreaterThanZero) {
        resultData.value =
          Math.round(
            ((recordData.value.opSong * 0.3 +
              recordData.value.opAnimation * 0.3 +
              recordData.value.opCompatibility * 0.4) *
              0.1 +
              recordData.value.ed * 0.1 +
              recordData.value.theme * 0.1 +
              recordData.value.music * 0.15 +
              recordData.value.drama * 0.3 +
              recordData.value.art * 0.15 +
              recordData.value.system * 0.1) *
              10
          ) / 10;
      } else {
        resultData.value = "數值計算有誤";
      }
    };
    return {
      recordData,
      resultData,
      handleCalculate,
    };
  },
});
</script>

<style scoped>
.sub-block {
  font-size: 25px !important;
  min-height: 600px;
  height: auto;
}
.title {
  font-size: 40px;
}
.result-data {
  color: green;
}
</style>
