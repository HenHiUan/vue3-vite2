import { defineStore } from "pinia";
export const cssStore = defineStore('aboutCss', {
  state: () => {
    return {
      aaa: 20
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