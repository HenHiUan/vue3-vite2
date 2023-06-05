// import routerConfig from "../../config/router.config.js";
// export default routerConfig
const files = import.meta.globEager('../views/*/router.config.js');
let routerList = [];
for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (files[key].default) {
      routerList.push(...files[key].default)
    }
  }
}
// console.log('routerList',routerList)
const routes = [
  ...routerList,
]
export default routes