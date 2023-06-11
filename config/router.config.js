const files = import.meta.globEager('../src/views/home/*.js');
let routerList = [];
for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (files[key].default) {
      routerList.push(...files[key].default)
    }
  }
}

const routes = [
  ...routerList,
]
export default routes