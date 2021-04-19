import { SafeAny } from '@/utils';
import { Ref, ref } from '@vue/runtime-core';
import { isFunction } from 'lodash';
import { EnvConfig, DEFAULT_CONFIG_URL, EnvConfigOption } from './util';

const state = {
  v: ref({}) as Ref<EnvConfig>,
  d: null as [Promise<EnvConfig>, (c: EnvConfig) => void],
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
      state.d[0].then(callback);
    } else {
      return state.d[0];
    }
  }
}

export function getEnvConfigSync(): Ref<EnvConfig> {
  return state.v;
}

export function fetchEnvConfig(option?: EnvConfigOption): Ref<EnvConfig> {
  if (state.f || state.d) return state.v;

  state.d = [] as SafeAny;
  state.d[0] = new Promise<EnvConfig>((resolve) => (state.d[1] = resolve));

  let doFetch = () => {
    const url = getEnvConfigUrl(option);
    const p = fetch(url).then((resp) => resp.json());

    p.then((config) => {
      doFetch = null;
      state.f = true;
      state.v.value = config;
      state.d[1](config);
    });

    p.catch(() => setTimeout(doFetch, 2000));
  };

  doFetch();
  return state.v;
}
