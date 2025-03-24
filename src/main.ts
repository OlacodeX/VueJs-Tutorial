import './assets/main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import '@formkit/themes/genesis'
import { plugin, defaultConfig } from '@formkit/vue'
import config from './../formkit.config'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(plugin, defaultConfig(config))
app.use(pinia)
app.use(ToastPlugin, {
    position: 'top-right',
    duration: 3000,
    dismissible: true,
    dismissibleByClick: true,
})
app.mount('#app')
