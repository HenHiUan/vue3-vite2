import { createStore } from 'vuex';
import user from './user'
// console.log("user",user)
export default createStore({
  modules: {
    user
  }
})