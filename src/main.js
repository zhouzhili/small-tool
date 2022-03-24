import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.css'

const app = createApp(App)

app.use(ElementPlus).use(router)
app.mount('#app')
