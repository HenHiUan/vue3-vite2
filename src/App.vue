<script setup>
import Menu from "@/views/home/menu.vue"
import Bar from "@/views/home/bar.vue"
import {useRouter} from 'vue-router'
import { computed, ref } from "vue";
const route = useRouter();
let path = ref(route);
const key = computed(()=>{
  return path.value.currentRoute.fullPath;
})
</script>

<template>
  <div id="homepage">
    <!-- <div id="header"></div> -->
    <div id="main">

      <div id="menu">
        <Menu></Menu>
      </div>

      <div id="content">
        <div class="top">
          <Bar></Bar>
        </div>

        <div class="bottom">
          <router-view v-slot="{ Component }" :key="key">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// $headerH: 55px;
$menuW: 200px;
#homepage {
  width: 100%;
  height: 100vh;
  // #header {
  // }
  #main {
    display: flex;
    flex-direction: row;
    height: 100%;
    #menu {
      max-width: $menuW;
    }
    #content {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .bottom {
        // padding: 15px;
        height: 100%;
        overflow: auto;
        flex: 1;
      }
    }
  }
}
</style>
