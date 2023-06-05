const files = import.meta.globEager('../views/*/store.config.js');

let storeKey = ["state","mutations","getters","actions"]
let store = {
  state: {},
  mutations: {},
  getters: {},
  actions: {},
};
for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (files[key].default) {
      for(let item of storeKey) {
        if(files[key].default[item]){
          store[item] = {
            ...store[item],
            ...files[key].default[item]
          }
        }
      }
    }
  }
}
// console.log('store',store)

export default store;