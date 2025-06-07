import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { refreshUserData } from "./bootstrap";
// global stylesheets
import "./assets/styles/button.css";
import "./assets/styles/animates.css";
import "./assets/styles/loader.css";

import { createPinia } from "pinia";

localStorage.clear(); // remove vuex data

const app = createApp(App).use(router).use(createPinia());
//wait refresh user data
await refreshUserData();

const loader = document.getElementById("loader");
if (loader) {
  loader.remove();
}

app.mount("#app");
