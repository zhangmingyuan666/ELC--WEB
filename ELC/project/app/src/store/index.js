import { createStore } from 'vuex'


export default createStore({
  state: {
    token:''  //初始化token
  },
  mutations: {
        //存储token方法
    //设置token等于外部传递进来的值
    setToken(state, token) {
      state.token = token
      localStorage.token = token //同步存储token至localStorage
    },
  },
  getters : {
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('token');
      }
      return state.token
      }
    },
  actions: {
  },
  modules: {
  }
})
