// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import ToastPlugin from 'vue-toast-notification';
import router from './router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useUserStore } from './stores/user';
import VueTheMask from 'vue-the-mask';

const app = createApp(App);
const pinia = createPinia();

app.use(VueTheMask)
app.use(ToastPlugin)
app.use(pinia);
app.use(router);
app.mount('#app');

const userStore = useUserStore();
userStore.loadUser();



