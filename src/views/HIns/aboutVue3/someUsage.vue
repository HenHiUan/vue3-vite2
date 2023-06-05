<script setup>
import {ref} from 'vue'
  import helloWorld from '@/components/HelloWorld.vue'
  const msg = ref("点击涨价")
</script>
<template>
  <div>
    <helloWorld :msg="msg"> </helloWorld>
  </div>
</template>