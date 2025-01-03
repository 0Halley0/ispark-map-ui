import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import "./assets/main.css"
import './assets/tailwind.css'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount('#app')
