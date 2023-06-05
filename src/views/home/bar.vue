<template>
  <div id="bar">
    <ul class="tags">
      <li 
        v-for="(item, index) in isOpened" 
        :index="item.fullPath" 
        :key="index"
        @click ="handleToggle(item)"
        :class="nowPath === item.path ? 'is-active' : ''"
      >
        <el-icon>
          <component :is="item.meta.icon"> </component>
        </el-icon>
        <span class="text">{{item.name}}</span>
        <el-icon class="close" v-if="item.path !== homePath">
          <Close
            @click.stop="handleClose(item)"
          ></Close>
        </el-icon>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import { ref, reactive, computed, watchEffect, watch, onMounted } from 'vue';
  import { useRouter,onBeforeRouteUpdate } from 'vue-router';
  import { useStore } from 'vuex';
  let store = useStore()
  // console.log(store.getters.$tags)
  // console.log(store.state.user.$tags)
  let router = useRouter()
  let homePath = ref('/home')
  let isOpened = ref([])
  const nowPath = ref(router.currentRoute.value.path);
  watchEffect(()=>{
    const value = router.currentRoute.value;
    // console.log('value',value)
    nowPath.value = value.path;
    if(value.matched.length) {
      const matched = value.matched[0];
      let tagsList = JSON.parse(sessionStorage.getItem('tagsList')) || [];
      // if(matched?.path !== homePath) {
      let flag = tagsList.some(item => item.path === matched.path)
      if(!flag) {
        tagsList.push(matched)
        sessionStorage.setItem('tagsList',JSON.stringify(tagsList));
      }
      // }
      isOpened.value = tagsList;
    }
  })
  onMounted(() => {
    // router.push({ path: "/"})
    // sessionStorage.clear();
    // console.log("isOpened",isOpened)
  })
  // watch(
  //   () => router.currentRoute.value,
  //   (newValue, oldValue) => {
  //     console.log("newValue",newValue)
  //     console.log("oldValue",oldValue)
  //   },
  //   { immediate: true }
  // )
  function handleClose(item) {
    let tagsList = JSON.parse(sessionStorage.getItem('tagsList'));
    for(let i = 0; i < tagsList.length; i++){
      let tag = tagsList[i];
      if(item.path === tag.path) {
        if(nowPath.value === item.path) {
          // 关闭当前页
          if(tagsList[i-1]?.path) {
            router.push({ path: tagsList[i-1].path })
          } else {
            if(tagsList[i+1]?.path) {
              router.push({ path: tagsList[i+1].path })
            } else {
              //主页
              router.push({path: homePath})
            }
          }
        }
        tagsList.splice(i,1);
        break;
      }
    }
    sessionStorage.setItem('tagsList',JSON.stringify(tagsList));
    isOpened.value = tagsList;
  }
  function handleToggle(item){
    router.push({ path: item.path })
  }
</script>
<style lang="scss" scoped>
#bar {
  background: #c8d5e3;
  height: 45px;
  width: 100%;
  .tags {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    li {
      line-height: 40px;
      min-width: 80px;
      padding: 0 15px;
      border-radius: 8px 8px 0 0;
      background: #c8d5e3;
      margin: 0 5px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .text {
      padding: 0 10px 0 5px;
      line-height: 40px;
    }
    .close {
      &:hover {
        color: #008ed3;
        background-color: #e3eaf4;
        border-radius: 30%;
      }
    }
    .is-active {
      background: #f2f4f6;
    }
  }
}
</style>