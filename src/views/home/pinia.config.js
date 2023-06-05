import { defineStore } from "pinia";
export const homeStore = defineStore('home', {
  state: () => {
    return {
      aaa: 10
    }
  },
  getters: {
    getaaa(state) {
        return state.aaa
    }
  },
  actions: {
    changeaaa(aaa) {
        this.aaa = aaa
    },
  }
})