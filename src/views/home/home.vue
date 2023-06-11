<script setup>
  import {homeStore} from './pinia.config.js'
  import { storeToRefs } from 'pinia'
  const store = homeStore();
  const { aaa } = storeToRefs(store) // 对状态进行赋值操作并保持响应式，不能使用getters
  // 一般修改
  // store.aaa += 10;
  // store.$patch({
  //   aaa: store.aaa + 1,
  // })
  // store.$patch(state => {
  //   state.aaa += 10
  // })

  //通过 actions 来修改数据
  // store.changeaaa(12)

  //getters
  // console.log(store.getaaa)

  // console.log(aaa)
  import starrySky from '../HIns/aboutCss/starrySky.vue'
</script>

<template>
<!-- <div> -->
  <!-- 广告位招租！！！
  {{ store.getaaa }}元一秒！！！ -->
  <starrySky></starrySky>
<!-- </div> -->
</template>


<style scoped lang="scss">

</style>
