<template>
  <div>
    <div class="text-black bg-yellow-500 py-7 text-center">Home page: {{ msg }}</div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      msg: 'hello world',
    };
  },
});
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  @apply text-white text-xl text-center bg-blue-400;

  line-height: 150px;
}
</style>
