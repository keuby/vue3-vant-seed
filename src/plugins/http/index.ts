import { App, inject, InjectionKey } from '@vue/runtime-core'
import axios from 'axios'
import adapter from './adapter'
import HttpClient from './http'
import { DefaultInterceptor } from './interceptor'

const HTTP_CLIENT_TOKEN: InjectionKey<HttpClient> = Symbol('HTTP_CLIENT_TOKEN')

export function useHttpClient(): HttpClient {
  return inject(HTTP_CLIENT_TOKEN)
}

export default function (app: App): void {
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

  const client = new HttpClient(instance)

  app.provide(HTTP_CLIENT_TOKEN, client)
  app.config.globalProperties.$http = client
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: HttpClient
  }
}
