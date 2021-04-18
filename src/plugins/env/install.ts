import { App, Ref } from '@vue/runtime-core';
import { fetchEnvConfig } from './fetch';
import { EnvConfig, EnvConfigOption, ENV_CONFIG_TOKEN } from './util';

export function isInstalled(app: App): boolean {
  return app.config.globalProperties.$envConfig != null;
}

export function installEnvConfig(app: App, envConfig: Ref<EnvConfig>): void {
  Object.defineProperty(app.config.globalProperties, '$envConfig', {
    get: () => envConfig.value,
  });
  app.provide(ENV_CONFIG_TOKEN, envConfig);
}

export function install(app: App, option?: EnvConfigOption): void {
  if (isInstalled(app)) return;

  const envConfig = fetchEnvConfig(option);
  installEnvConfig(app, envConfig);
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $envConfig: EnvConfig;
  }
}
