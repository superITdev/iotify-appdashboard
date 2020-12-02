import Vue from 'vue'

// import App from './App0.vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
// import router from './router'
import store from './store'

import vgl from 'vue-golden-layout'
import 'golden-layout/src/css/goldenlayout-light-theme.css'
Vue.use(vgl);

import { Laue } from 'laue'
Vue.use(Laue);

Vue.config.productionTip = false

new Vue({
  vuetify,
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
