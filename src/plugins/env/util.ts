import { InjectionKey } from '@vue/runtime-core';
import { Ref } from '@vue/reactivity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EnvConfig {}

export interface EnvConfigOption<T = EnvConfig> {
  key?: InjectionKey<T>;
  mode?: string;
  configUrl?: string | ((mode: string) => string);
}

export const DEFAULT_KEY = Symbol('ENV_DEFAULT_KEY');

export const DEFAULT_CONFIG_URL = '/config.json';

export const ENV_CONFIG_TOKEN: InjectionKey<Ref<EnvConfig>> = Symbol('ENV_CONFIG_TOKEN');
