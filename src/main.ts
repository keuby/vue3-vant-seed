import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import http from './plugins/http';
import touch from './plugins/touch';
import store from './store';
import bootstrap from './bootstrap';
import './styles/index.less';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(http);
app.use(touch);

bootstrap(app, () => app.mount('#app'));
