<script setup>
  import { ref } from 'vue'
  import { cssStore } from '../pinia.config.js'
  import { storeToRefs } from 'pinia'
  const store = cssStore();
  const { aaa } = storeToRefs(store) // 对状态进行赋值操作并保持响应式，不能使用getters
  let colorRed = ref("red")
</script>
<template>
  <div class="card">
    css效果
    {{aaa}}
  </div>
</template>
<style lang="scss" scoped>
  .card {
    // --bg: red;
    // background: var(--bg);
    background: v-bind(colorRed)
  }
</style>