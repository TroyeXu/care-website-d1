// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

// 導入 tsparticlesㄇㄩ
import Particles from "@tsparticles/vue3"
import { loadSlim } from "tsparticles-slim"
const app = createApp(App)
app.use(Particles, {})
app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    dark: 'auto',
    notify: {
      position: 'top-right',
      timeout: 2000,
      textColor: 'white'
    }
  }
})


app.mount('#app')