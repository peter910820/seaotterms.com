import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { refreshUserData } from "./bootstrap";
// global stylesheets
import "./assets/styles/button.css";
import "./assets/styles/animates.css";
import { createPinia } from "pinia";

const app = createApp(App).use(router).use(store).use(createPinia());
//wait refresh user data
await refreshUserData();
app.mount("#app");
