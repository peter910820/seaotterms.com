import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
// global stylesheets
import "./assets/styles/button.css";

createApp(App).use(router).use(store).mount("#app");
