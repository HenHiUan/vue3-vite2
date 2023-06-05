let $common = {
  aaa: function() {
    return 10
  },
  getSessionStorage: function(key) {
    return JSON.parse(sessionStorage.getItem(key)) || [];
  },
  setSessionStorage: function(key, data) {
    sessionStorage.setItem(key,JSON.stringify(data))
  }
}
export default $common