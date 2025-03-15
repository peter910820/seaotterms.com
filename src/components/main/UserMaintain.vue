<template>
  <div class="mainBlock">
    <form method="post" @submit.prevent="handleSubmit">
      <h1>使用者帳號維護</h1>
      <div class="col s12 sub-block floatup-div wow animate__bounceIn">
        <div class="title">使用者名稱: {{ userData.username }}</div>
        <div class="title">
          身分:
          <span v-if="userData.management">管理員</span>
          <span v-else>一般用戶</span>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">sports_esports</i>
          <input id="avatar" v-model="userData.avatar" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="avatar">個人圖片URL</label>
        </div>
        <div>
          <span>圖片預覽:</span>
          <div class="headShot">
            <img :src="userData.avatar" />
          </div>
        </div>
        <div>
          <button class="btn waves-effect waves-light" type="submit" name="action">
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  setup() {
    const store = useStore();
    const userData = store.state.userData;
    const handleSubmit = () => {
      console.log("test");
    };
    return { userData, handleSubmit };
  },
});
</script>

<style scoped>
.col {
  max-height: 500px;
  height: 500px;
  padding-top: 20px;
  margin-top: 10px;
  cursor: default;
}
.mainBlock {
  padding: 25px;
}
.center {
  text-align: center;
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
.headShot {
  max-height: 200px;
  max-width: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed orange;
  border-radius: 100%;
  > img {
    width: 100%;
    height: 100%;
  }
}
span {
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
