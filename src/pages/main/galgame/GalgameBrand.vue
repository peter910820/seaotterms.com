<template>
  <div class="row main-block">
    <div class="col s12 center-align galgameBrandTitle">
      <div class="col s12">
        Galgameブランド紀錄
        <router-link to="/galgamebrand/create" class="button-simple">點我新增品牌</router-link>

        <router-link to="/galgame/create" class="button-simple">點我新增遊戲</router-link>
      </div>
    </div>
    <div class="col s12 galgameBrandHeader">
      <div class="col s3">ブランド</div>
      <div class="col s2">攻略數</div>
      <div class="col s2">總遊戲數</div>
      <div class="col s2">狀態</div>
      <div class="col s1">解散</div>
      <div class="col s1">修改</div>
      <div class="col s1">展開</div>
    </div>
    <div class="col s12 galgameBrandHeader">
      <div class="col s3"></div>
      <div class="col s2">{{ total }}</div>
      <div class="col s2"></div>
      <div class="col s2"></div>
      <div class="col s1"></div>
      <div class="col s1"></div>
      <div class="col s1"></div>
    </div>
    <div
      class="col s12 galgameBrand floatup-div wow animate__slideInUp"
      v-for="galgameBrandData in galgameBrand"
      :key="galgameBrandData.brand"
    >
      <div class="col s3 brand">{{ galgameBrandData.brand }}</div>
      <div class="col s2">{{ galgameBrandData.completed }}</div>
      <div class="col s2">{{ galgameBrandData.total }}</div>
      <div class="col s2" v-if="galgameBrandData.annotation === '制霸'">
        <b>
          <font color="blue">{{ galgameBrandData.annotation }}</font>
        </b>
      </div>
      <div class="col s2" v-else>{{ galgameBrandData.annotation }}</div>
      <div class="col s1">
        <font color="red">{{ galgameBrandData.dissolution ? "解散" : "" }}</font>
      </div>
      <div class="col s1">
        <router-link :to="`/galgamebrand/edit/${galgameBrandData.brand}`" class="button-simple modify">
          修改
        </router-link>
      </div>
      <div class="col s1">
        <button class="button-simple modify" @click="openModal(galgameBrandData.brand)">+</button>
      </div>
    </div>

    <!-- 全螢幕彈出視窗 -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h4>{{ selectedBrand }} 通關遊戲資料</h4>
        <div class="col s12 galgameBrandHeader">
          <div class="col s6 left-align">ゲーム</div>
          <div class="col s2">発売日</div>
          <div class="col s2">遊玩結束時間</div>
          <div class="col s1">全年齡</div>
          <div class="col s1">修改</div>
        </div>
        <div class="col s12 galgameBrand floatup-div" v-for="brandGames in selectedBrandGames" :key="brandGames.name">
          <div class="col s6 left-align">{{ brandGames.name }}</div>
          <div class="col s2">{{ formatDate(brandGames.releaseDate) }}</div>
          <div class="col s2">{{ formatDate(brandGames.endDate) }}</div>
          <div class="col s1" v-if="brandGames.allAges === false">
            <b>
              <font color="pink">18+</font>
            </b>
          </div>
          <div class="col s1" v-else><font color="purple">全年齡</font></div>
          <div class="col s1">
            <router-link :to="`/`" class="button-simple modify">修改</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useGalgameBrandStore } from "@/store/galgame";
import { storeToRefs } from "pinia";
import axios from "axios";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    const galagmeBrandStore = useGalgameBrandStore();
    const { galgameBrand } = storeToRefs(galagmeBrandStore);
    const modalVisible = ref(false);
    const selectedBrand = ref("");
    const selectedBrandGames = ref<
      Array<{
        name: string;
        releaseDate: string;
        allAges: boolean;
        endDate: string;
      }>
    >([]);
    let total = ref(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openModal = async (brand: any) => {
      selectedBrand.value = brand;
      try {
        let response = await axios.get(`/api/galgame/${brand}`);
        selectedBrandGames.value = response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`${error.response?.status}: ${error.response?.data.msg}`);
          selectedBrandGames.value = [];
        } else {
          console.log("未知錯誤: " + error);
          selectedBrandGames.value = [];
        }
      }
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    const formatDate = (date: string) => dayjs(date).format("YYYY-MM-DD");
    galgameBrand.value.forEach((element: { completed: number }) => {
      total.value += element.completed;
    });
    return {
      galgameBrand,
      openModal,
      selectedBrand,
      modalVisible,
      closeModal,
      selectedBrandGames,
      formatDate,
      total,
    };
  },
});
</script>

<style scoped>
.col {
  max-height: 50px;
  height: 50px;
  margin-top: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: default;
}
.galgameBrandTitle {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  max-height: 100px;
  height: 100px;
  > .col {
    padding: 0px;
    margin: 0px;
    min-height: 100%;
  }
}
.galgameBrandHeader {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  max-height: 80px;
  height: 80px;
}
.galgameBrand {
  text-align: center;
  max-height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  > div {
    font-size: x-large;
    margin-left: 5px;
    padding: 0px;
    max-height: 100%;
    > button {
      padding: 0px !important;
      height: 30px;
      max-height: 30px;
      font-size: 20px;
    }
  }
}
.brand {
  font-weight: bold;
}
.modify {
  height: 30px;
  width: 40px;
}
.details {
  max-height: 200px;
  height: 200px;
}
td {
  font-size: large;
}
a {
  color: black !important;
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
  padding: 40px;
}
</style>
