import { defineComponent, watchEffect } from '@vue/runtime-core';
import { RouterView } from 'vue-router';
import { ThemeProvider } from 'vue3-styled-components';
import { useEnvConfig } from './plugins/env';
import './styles/index.less';

export default defineComponent({
  name: 'App',
  setup() {
    const envConfig = useEnvConfig();
    watchEffect(() => {
      // @ts-ignore
      console.log(envConfig.value);
    });
  },
  render() {
    return (
      <ThemeProvider theme={{}} class="w-full h-full">
        <RouterView></RouterView>
      </ThemeProvider>
    );
  },
});
