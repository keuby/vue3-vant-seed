import { App } from 'vue'
import axios from 'axios'
import adapter from './adapter'
import HttpClient from './http'
import { DefaultInterceptor } from './interceptor'

let httpClient: HttpClient = null

export function isInstalled(app: App) {
  return app.config.globalProperties.$http != null
}

export function createHttpClient() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL as string,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json;charset=utf-8',
    },
    timeout: 10000,
    adapter: adapter(axios.defaults.adapter), // 初始化 adapter
  })

  // 初始化 intercepter
  const intercepter = new DefaultInterceptor()
  instance.interceptors.response.use(intercepter.onFulfilled, intercepter.onRejected)

  return (httpClient = new HttpClient(instance))
}

export function getHttpClient() {
  return httpClient || createHttpClient()
}
