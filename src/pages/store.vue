<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>token: {{ user.bearerToken }}</p>
    <div>
      set token:
      <input v-model="user.token" type="text" />
    </div>
    <van-list
      v-model:error="state.error"
      v-model:loading="state.loading"
      :finished="state.finished"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in state.list" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>

<script lang="ts">
import { useTokenStore } from '@/store';
import { defineComponent, reactive } from '@vue/runtime-core';
import { useHttpClient } from '@/plugins/http';

export default defineComponent({
  setup() {
    const http = useHttpClient();
    const user = useTokenStore();
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });

    const onLoad = () => {
      http.get('/typicode/demo/db').then((data) => {
        state.loading = false;
        const posts = data.posts;
        if (posts.length === 0) {
          state.finished = true;
          return;
        }
        state.list.push(...posts);
        if (state.list.length > 40) {
          state.finished = true;
        }
      });
    };

    return { user, state, onLoad };
  },
});
</script>
