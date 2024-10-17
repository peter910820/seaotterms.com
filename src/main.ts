import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import HomeView from './views/HomeView.vue';
import TestView from './views/TestView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/test', component: TestView },
    ],
  })

createApp(App).use(router).mount('#app')
