import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { createProvider } from './vue-apollo'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

// const provider = createProvider as Fun

new Vue({
  router,
  // @ts-ignore
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
