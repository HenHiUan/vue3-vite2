<template>
  <div class="leftMenu" ref="leftMenu">
    <!-- <el-radio-group v-model="isCollapse" class="btn" :style="{right: isCollapse ? '-10px' : '-2px'}">
      <el-radio-button v-if="isCollapse" :label="false">》</el-radio-button>
      <el-radio-button v-else :label="true">《</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :default-active="getCurrentPath"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      router
      :collapse-transition="true"
    >
      <el-sub-menu v-for="(item, index) in menuList" :index="item.title+index" :key="item.title+index">
        <!-- 一级 -->
        <template #title>
          <el-icon>
            <component :is="item.icon" :style="{color: item.color}"> </component>
          </el-icon>
          <span>{{item.title}}</span>
        </template>
        <!-- 二级 -->
        <div v-for="(second,i2) in item.children" :key="second.title+i2">
           <!-- 二级（含children） -->
          <el-sub-menu :index="second.title+i2" v-if="second.children && second.children.length">
            <template #title><span>{{second.title}}</span></template>
            <!-- 三级 -->
            <div>
              <el-menu-item 
                v-for="(third,i3) in second.children" 
                :key="third.title+i3" 
                :index="third.path"
              >
              {{third.title}}
            </el-menu-item>
            </div>
          </el-sub-menu>
           <!-- 二级（无children） -->
          <!-- <el-menu-item-group v-else> -->
          <el-menu-item 
            v-else 
            :index="second.path"
          >
            {{second.title}}
          </el-menu-item>
          <!-- </el-menu-item-group> -->
        </div>

      </el-sub-menu>
    </el-menu>
      <div class="btn pointer" @click="handleMenu">
        <transition name="collapse" mode="out-in">
          <div v-if="!isCollapse"> 
            <span class="dib vam mr-5">
              <el-icon><DArrowLeft /></el-icon>
            </span>
            <span>收起</span>
          </div>
          <el-icon v-else><DArrowRight /></el-icon>
        </transition>
      </div>
  </div>
</template>

<script setup>
  import { computed, ref, watchEffect, onMounted } from 'vue'
  import getMenu from '@/components/base/Menu.js'
  // import {
  //   Document,
  //   Menu as IconMenu,
  //   Location,
  //   Setting,
  // } from '@element-plus/icons-vue'
  import {useRouter} from 'vue-router'
  import { homeStore } from './pinia.config.js'
  import { storeToRefs } from 'pinia'
  let router = useRouter();
  const store = homeStore();
  const { getCurrentPath } = storeToRefs(store)
  // const activePath = ref(getCurrentPath)
  // watchEffect(()=>{
  //   console.log('activePath',getCurrentPath)
  // })

  const leftMenu = ref(null);
  const isCollapse = ref(false);
  const handleMenu = () => {
    isCollapse.value = !isCollapse.value;
    if(isCollapse.value === true) {
      leftMenu.value.style.setProperty('--menuMinWidth','0px')
    } else {
      leftMenu.value.style.setProperty('--menuMinWidth','180px')
    }
    
  }
  const handleOpen = (key, keyPath) => {
    // console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    // console.log(key, keyPath)
  }

  const list = ref(getMenu);
  const menuList = computed(() => list.value)
  // console.log('menuList',menuList)
</script>

<style lang="scss" scoped>
$minWidth: var(--menuMinWidth);
.leftMenu {
  transition: min-width .68s;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: $minWidth;
  .el-menu-vertical-demo {
    background: aliceblue;
    flex: 1;
  }
  .btn {
    color: var(--el-text-color-regular);
    background: aliceblue;
    line-height: 40px;
    text-align: center;
    border-right: solid 1px var(--el-menu-border-color);
    border-top: solid 1px var(--el-menu-border-color);
    &:hover {
      background: rgb(230, 240, 250);
    }
  }
  // 过渡
  .collapse-enter-from, .collapse-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  .collapse-enter-to, .collapse-leave-from {
    opacity: 1;
  }
  .collapse-enter-active {
    transition: all 0.3s ease;
  }
  .collapse-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.6, 0.6, 1);
  }
}
</style>
