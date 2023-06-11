<template>
  <div id="bar">
    <ul class="tags">
      <li 
        v-for="(item, index) in isOpened" 
        :index="item.fullPath" 
        :key="index"
        @click="handleToggle(item)"
        @click.right.prevent="rightMenu($event,item,index)"
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
    <transition name="rightMenuBox" mode="out-in">
      <ul class="rightMenu" v-if="showRightMenu" ref="rightMenuDom">
        <li 
          v-for="(item, index) in rightMenuArr" 
          :index="item.name" 
          :key="index"
          @click="closeTags(item)"
        >{{item.name}}</li>
      </ul>
    </transition>
  </div>
</template>
<script setup>
  const rightMenuArr = [
    {name: "关闭其他", operate: 'other'},
    {name: "关闭所有", operate: 'all'},
    // {name: "关闭", operate: 'close'},
  ]
  import { ref, reactive, computed, watchEffect, watch, onMounted, onUnmounted, nextTick } from 'vue';
  import { useRouter,onBeforeRouteUpdate } from 'vue-router';
  // import { useStore } from 'vuex';
  // let store = useStore()
  import { homeStore } from './pinia.config.js'
  import { storeToRefs } from 'pinia'
  const store = homeStore();
  // const pinia = storeToRefs(store)
  // console.log("pinia",pinia)
  // console.log(store.getters.$tags)
  // console.log(store.state.user.$tags)
  let router = useRouter()
  let homePath = '/home'
  let isOpened = ref([])
  const nowPath = ref(router.currentRoute.value.path);
  watchEffect(()=>{
    const value = router.currentRoute.value;
    nowPath.value = value.path;
    if(value.matched.length) {
      // console.log('nowPath',nowPath.value)
      store.changeCurrentPath(nowPath.value)
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
        if(nowPath.value === item.path) { //当前页面路径=关闭页面路径
          // 关闭当前页
          if(tagsList[i-1]?.path) { //往前跳转
            router.push({ path: tagsList[i-1].path })
          } else {
            //主页
            router.push({path: homePath})
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
  let showRightMenu = ref(false)
  let rightMenuDom = ref(null)
  onMounted(() => {
    nextTick(()=>{
      watchEffect(()=>{
        // console.log('showRightMenu',showRightMenu.value)
        if(showRightMenu.value) {
          document.addEventListener('click',mouseup);
        } else {
          document.removeEventListener('click', mouseup);
        }
      })
    })
  })
  const mouseup = (e) => {
    if(!rightMenuDom.value?.contains(e.target)) { //判断DOM元素的包含关系（rightMenuDom是否包含鼠标松开时所在节点的e.target）
      console.log('点击了弹窗外部')
      showRightMenu.value = false;
    }
  }
  let rightMenuItem = null;
  function rightMenu(e,item,index) {
    e.stopPropagation();
    showRightMenu.value = true;
    rightMenuItem = item;
    nextTick(()=>{
      let bar = document.querySelector('#bar');
      let rightMenu = bar.querySelector('.rightMenu');
      let rightMenuHalfWidth = rightMenu.offsetWidth / 2;
      rightMenu.style.left = (e.clientX - rightMenuHalfWidth) + 'px';
      // rightMenu.style.top = e.clientY + 'px';
    })
  }
  function closeTags(item){
    let tagsList = JSON.parse(sessionStorage.getItem('tagsList'));
    if(item.operate === 'all') { //关闭所有
      isOpened.value.splice(1); //截掉菜单栏除主页外全部菜单
      tagsList.splice(1); //截掉sessionStorage除主页外全部菜单
      router.push({path: homePath})
    }
    if(item.operate === 'other') { //关闭其他
      // nowPath 根据当前路径操作
      for(let i = isOpened.value.length - 1; i > 0; i--) { //倒序截取
        // if(isOpened.value[i].path !== nowPath.value) {
        //   isOpened.value.splice(i,1); //截掉菜单栏除主页、当前页外全部菜单
        //   tagsList.splice(i,1); //截掉sessionStorage除主页、当前页外全部菜单
        // }
        if(isOpened.value[i].path !== rightMenuItem.path) {
          isOpened.value.splice(i,1); //截掉菜单栏除主页、点击页外全部菜单
          tagsList.splice(i,1); //截掉sessionStorage除主页、点击页外全部菜单
        }
      }
      router.push({path: rightMenuItem.path})
    }
    sessionStorage.setItem('tagsList',JSON.stringify(tagsList)); //更新菜单
    showRightMenu.value = false;
  }
</script>
<style lang="scss" scoped>
#bar {
  // position: relative;
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
  .rightMenu {
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px #c6c6c6;
    width: 120px;
    position: fixed;
    top: 45px;
    z-index: 1001;
    background: #fff;
    li {
      padding: 0 15px;
      line-height: 32px;
      border-bottom: 1px solid #ddd;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background: #ecf5ff;
      }
      &:first-child {
        border-radius: 5px 5px 0 0;
      }
      &:last-child {
        border-bottom: none;
        border-radius: 0 0 5px 5px;
      }
    }
    &::before {
      content: "";
      border-width: 7px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
   // 过渡
  .rightMenuBox-enter-from, .rightMenuBox-leave-to {
    opacity: 0;
  }
  .rightMenuBox-enter-to, .rightMenuBox-leave-from {
    opacity: 1;
  }
  .rightMenuBox-enter-active {
    transition: all 0.1s ease;
  }
  .rightMenuBox-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.6, 0.6, 1);
  }
}
</style>