<template>
  <div class="row wow animate__flipInX">
    <h1>Galgameブランド修改</h1>
    <form class="col s12" method="post">
      <div class="row">
        <div class="col s6 update-div">
          <h2 class="label">上次更新使用者: {{ form.updateName }}</h2>
        </div>
        <div class="col s6 update-div">
          <h2 class="label">上次更新時間: {{ form.updateTime }}</h2>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">apartment</i>
          <input id="brand" v-model="form.brand" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="brand">ブランド</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">done_outline</i>
          <input id="completed" v-model="form.completed" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="completed">Completed</label>
          <!-- <label for="username">userName</label> -->
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">format_list_bulleted</i>
          <input id="total" v-model="form.total" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="total">Total</label>
        </div>
        <div class="input-field col s6">
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="form.dissolution" />
              <span>解散</span>
            </label>
          </p>
        </div>
        <div class="col s12">
          <button class="btn waves-effect waves-light" type="submit" name="action">
            新增
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const galgameBrandSingleData = ref(store.state.galgameBrandSingleData);

    const form = ref({
      brand: galgameBrandSingleData.value.brand,
      updateName: galgameBrandSingleData.value.update_name,
      updateTime: galgameBrandSingleData.value.update_time,
      completed: galgameBrandSingleData.value.completed,
      total: galgameBrandSingleData.value.total,
      dissolution: galgameBrandSingleData.value.dissolution,
    });

    console.log(form.value.updateName);
    console.log(form.value.updateTime);
    return {
      form,
    };
  },
});
</script>

<style scoped>
.row {
  padding: 50px;
}
.update-div {
  min-height: 100px;
  max-height: 100px;
}
.label {
  min-height: 100%;
  max-height: 100%;
  font-size: 20px;
  font-weight: bold;
  color: blue;
  white-space: normal;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
