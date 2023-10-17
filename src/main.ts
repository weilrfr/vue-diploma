import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import bottomNavigationVue from "bottom-navigation-vue";
import "bottom-navigation-vue/dist/style.css";

import 'primevue/resources/themes/arya-green/theme.css';

import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css';


const app = createApp(App)

// app.use(bottomNavigationVue);
app.use(router);
app.use(PrimeVue);

app.mount('#app')
