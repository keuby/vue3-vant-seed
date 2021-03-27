import { App } from '@vue/runtime-core';
import { recordTokenChange } from '@/store';

export default function (app: App, next: () => void): void {
  recordTokenChange();
  next();
}
