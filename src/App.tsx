import { defineComponent } from '@vue/runtime-core';
import { RouterView } from 'vue-router';
import { ThemeProvider } from 'vue3-styled-components';
import './styles/index.less';

export default defineComponent({
  name: 'App',
  render() {
    return (
      <ThemeProvider theme={{}} class="w-full h-full">
        <RouterView></RouterView>
      </ThemeProvider>
    );
  },
});
