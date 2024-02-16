import { createApp } from 'vue'
// 導入css
import '@/assets/sass/index.scss'

import ElementPlus from 'element-plus'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/utils/fontawesome'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhTw
})
app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
