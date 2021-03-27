import Hammer from 'hammerjs';
import { App, Directive } from '@vue/runtime-core';

interface HammerHTMLElememt extends HTMLElement {
  // eslint-disable-next-line camelcase
  __hammer_manager__: HammerManager;
  // eslint-disable-next-line camelcase
  __hammer_handler__: HammerListener;
}

const touchDirective: Directive<HammerHTMLElememt, HammerListener> = {
  created(el, binding) {
    const manager = (el.__hammer_manager__ = new Hammer.Manager(el));
    manager.add(new Hammer.Tap());
    el.__hammer_handler__ = binding.value.bind(binding.instance);
    manager.on('tap', el.__hammer_handler__);
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      const manager = el.__hammer_manager__;
      manager.off('tap', el.__hammer_handler__);

      el.__hammer_handler__ = binding.value.bind(binding.instance);
      manager.on('tap', el.__hammer_handler__);
    }
  },
  unmounted(el) {
    const manager = el.__hammer_manager__;
    manager && manager.destroy();
    el.__hammer_manager__ = null;
    el.__hammer_handler__ = null;
  },
};

export default (app: App): void => {
  app.directive('tap', touchDirective);
};
