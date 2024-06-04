import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store/store.js';
const app = createApp(App)

app.use(router)
app.use(store);
app.config.errorHandler = (err, vm, info) => {
    console.error(`Error: ${err.toString()}\nInfo: ${info}`);
  };
  

app.mount('#app')
