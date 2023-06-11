<script setup>
import { ref, getCurrentInstance, inject } from 'vue'
defineProps({
  msg: String,
})
// const {proxy} = getCurrentInstance();
// let bottonText = ref(proxy.$common.aaa());
let {aaa} = inject('$common')
let bottonText = ref(aaa());


import { homeStore } from '@/views/home/pinia.config.js'
import { storeToRefs } from 'pinia'
const store = homeStore(); //直接对store进行解构，会破坏数据的响应
const val = storeToRefs(store) //响应式处理
// console.log('val',val)
// console.log('store',store)

function changeBottonText() {
  // let random = Math.random();
  store.aaa++;
  bottonText.value = store.getaaa;
  console.log('aaa',store.getaaa)
}
const count = ref(0)

</script>

<template>
 <div>
   <h1>{{ msg }}</h1>
  <el-button type="primary" @click="changeBottonText">{{bottonText}}</el-button>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

 </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
