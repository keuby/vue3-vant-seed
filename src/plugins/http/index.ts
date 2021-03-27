import { App, getCurrentInstance, inject, InjectionKey } from '@vue/runtime-core';
import HttpClient from './http';
import { isInstalled, getHttpClient } from './util';

const HTTP_CLIENT_TOKEN: InjectionKey<HttpClient> = Symbol('HTTP_CLIENT_TOKEN');

export function useHttpClient(): HttpClient {
  return getCurrentInstance() ? inject(HTTP_CLIENT_TOKEN) : getHttpClient();
}

export default function (app: App): void {
  if (isInstalled(app)) return;

  const client = getHttpClient();
  app.provide(HTTP_CLIENT_TOKEN, client);
  app.config.globalProperties.$http = client;
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: HttpClient;
  }
}
