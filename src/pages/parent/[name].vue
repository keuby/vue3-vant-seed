<template>
  <div>
    child dynamic param
    <div>name: {{ name }}</div>
    <div>{{ $route.meta.auth }}</div>
    <div><hello-world msg="hello world" /></div>
    <part-1></part-1>
    <part-2></part-2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Part1 from './components/part1.vue';
import Part2 from './components/indent/part2.vue';

export default defineComponent({
  components: {
    part1: Part1,
    part2: Part2,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<route>
props: true
meta:
  auth: true
</route>
