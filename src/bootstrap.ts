import { App } from '@vue/runtime-core';
import { recordTokenChange } from '@/store';
import { getUserProfile } from './apis/user';

export default function (app: App, next: () => void): void {
  recordTokenChange();
  getUserProfile().then(() => next());
}
