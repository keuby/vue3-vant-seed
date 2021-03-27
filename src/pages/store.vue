<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p @click="handleClick">token: {{ user.bearerToken }}</p>
    <div>
      set token:
      <input v-model="user.token" type="text" />
    </div>
  </div>
</template>

<script lang="ts">
import { Toast } from 'vant';
import { useTokenStore } from '@/store';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    const user = useTokenStore();

    const handleClick = () => Toast.success('clcked');

    return { user, handleClick };
  },
});
</script>
