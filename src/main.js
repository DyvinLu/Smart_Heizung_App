import './assets/main.css'
import './assets/css/bootstrap.min.css'
import './assets/plugins/fontawesome/css/fontawesome.min.css'
import './assets/css/feather.css'
import './assets/plugins/fontawesome/css/all.min.css'
import './assets/css/style.css'

import { createApp } from 'vue'
import { Router } from './router.js'
import { Auth } from './auth.js'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(Router)
app.config.globalProperties.$auth = Auth
app.use(createPinia())
app.provide('authConfig', Auth)
Auth
  .initialize()
  .then(() => {})
  .catch(console.error)
  .finally(() => {
    app.mount('#app')
  })
