<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/store">Store</router-link>
    |
    <router-link to="/parent/name">With Child and Component</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'App',
});
</script>

<style>
body {
  font-size: 16px;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
}
</style>
