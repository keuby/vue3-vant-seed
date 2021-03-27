import { defineStore } from 'pinia';
import { watchEffect, WatchStopHandle } from '@vue/runtime-core';

const TOKEN_LOCAL_KEY = 'token';
const EXPIRED_LOCAL_KEY = 'expired';

export const useTokenStore = defineStore({
  id: 'user',
  state: () => ({
    token: localStorage.getItem(TOKEN_LOCAL_KEY) || '',
    expired: parseInt(localStorage.getItem(EXPIRED_LOCAL_KEY), 10) || -1,
  }),
  getters: {
    bearerToken() {
      const now = new Date().getTime();
      const token = this.token;
      return this.expired > now || !token ? '' : `Bearer ${token}`;
    },
  },
  actions: {
    setToken(tk: string, exp: number) {
      this.token = tk;
      this.expired = exp;
    },
  },
});

export function recordTokenChange(): WatchStopHandle {
  const user = useTokenStore();
  return watchEffect(() => {
    localStorage.setItem(TOKEN_LOCAL_KEY, user.token);
    localStorage.setItem(EXPIRED_LOCAL_KEY, user.expired.toString());
  });
}
