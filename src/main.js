import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// 導入css
import '@/assets/sass/index.scss'
// ElementPlus
import ElementPlus from 'element-plus'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import 'element-plus/dist/index.css'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/utils/fontawesome'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhTw
})

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
