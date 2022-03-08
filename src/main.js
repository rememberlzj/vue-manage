import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from 'axios'
import './api/mock.js'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

//使用全局守卫来进行部分功能的限制，比如（未登录时，无法通过链接直接进入首页；登录后无法再次返回登录页面）
router.beforeEach((to, from, next) => {
  //获取到token
  store.commit('getToken')
  //将子组件中的token放入该页面的token中
  const token = store.state.user.token
  //对我们获得到的token进行判断

  //当我们没有登录建立token，并且通过接口直接进入首页时，自动眺转到登录页面
  //就是没有登陆时，无法进入首页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
    //当我们已经建立token时，无法返回登录界面，自动眺转到首页
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', this.$router)
  }
}).$mount('#app')
