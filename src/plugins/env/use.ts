import { inject, Ref } from '@vue/runtime-core';
import { getEnvConfigSync } from './fetch';
import { EnvConfig, ENV_CONFIG_TOKEN } from './util';

export function useEnvConfig(): Ref<EnvConfig> {
  return inject(ENV_CONFIG_TOKEN, () => getEnvConfigSync(), true);
}
