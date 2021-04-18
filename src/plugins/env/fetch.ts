import { Ref, ref } from '@vue/runtime-core';
import { isFunction } from 'lodash';
import { EnvConfig, DEFAULT_CONFIG_URL, EnvConfigOption } from './util';

const state = {
  v: ref({
    SERVER_URL: 'null',
  }) as Ref<EnvConfig>,
  p: null as Promise<EnvConfig>,
  f: false,
};

function getEnvConfigUrl(option: EnvConfigOption): string {
  if (option?.configUrl == null) return DEFAULT_CONFIG_URL;

  const configUrl = option.configUrl;
  if (isFunction(configUrl)) {
    return configUrl(option.mode);
  }
  return configUrl.replace('{mode}', option.mode ?? '');
}

export function getEnvConfig(): Promise<EnvConfig>;
export function getEnvConfig(callback: (config: EnvConfig) => void): void;
export function getEnvConfig(callback?: (config: EnvConfig) => void): Promise<EnvConfig> | void {
  if (state.f) {
    if (isFunction(callback)) {
      callback(state);
    } else {
      return Promise.resolve(state.v);
    }
  } else {
    if (isFunction(callback)) {
      state.p.then(callback);
    } else {
      return state.p;
    }
  }
}

export function getEnvConfigSync(): Ref<EnvConfig> {
  return state.v;
}

export function fetchEnvConfig(option?: EnvConfigOption): Ref<EnvConfig> {
  if (state.f || state.p != null) return state.v;

  const url = getEnvConfigUrl(option);
  state.p = fetch(url).then((resp) => resp.json());

  state.p.then((config) => {
    state.f = true;
    state.v.value = config;
  });

  state.p.catch(() => {
    setTimeout(() => fetchEnvConfig(option), 2000);
  });

  state.p.finally(() => {
    state.p = null;
  });

  return state.v;
}
