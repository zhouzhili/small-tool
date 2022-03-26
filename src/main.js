import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index.js'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './style/index.css'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
}).use(router)

app.mount('#app')
