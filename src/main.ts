import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import http from '@/plugins/http'
import touch from '@/plugins/touch'
import store, { recordTokenChange } from '@/store'
import './styles/index.less'

createApp(App).use(store).use(router).use(http).use(touch).mount('#app')

recordTokenChange()
