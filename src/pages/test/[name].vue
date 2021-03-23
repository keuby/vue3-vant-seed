<template>
  <div>
    test dynamic param
    <div>name: {{ name }}</div>
    <div>{{ $route.meta.auth }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>

<route>
props: true
meta:
  auth: true
</route>
