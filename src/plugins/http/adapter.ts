import store, { useTokenStore } from '@/store';
import { AxiosAdapter, AxiosRequestConfig } from 'axios';

export const authAdapter = (adapter: AxiosAdapter): AxiosAdapter => {
  const token = useTokenStore(store);
  return (config: AxiosRequestConfig) => {
    config.headers.Authorization = 'Bearer ' + token.token;
    return adapter(config);
  };
};

export default function (adapter: AxiosAdapter): AxiosAdapter {
  return authAdapter(adapter);
}
