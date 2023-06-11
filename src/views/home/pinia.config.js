import { defineStore } from "pinia";
export const homeStore = defineStore('home', {
  state: () => {
    return {
      aaa: 10,
      currentPath: '/home'
    }
  },
  getters: {
    getaaa(state) {
        return state.aaa
    },
    getCurrentPath(state) {
      return state.currentPath
    },
  },
  actions: {
    changeaaa(aaa) {
        this.aaa = aaa
    },
    changeCurrentPath(path) {
      this.currentPath = path;
    },
  }
})