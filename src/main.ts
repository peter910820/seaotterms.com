import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
// global stylesheets
import "./assets/styles/button.css";
import "./assets/styles/animates.css";
import { createPinia } from "pinia";

createApp(App).use(router).use(store).use(createPinia()).mount("#app");
