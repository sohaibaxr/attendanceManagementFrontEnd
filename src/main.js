import store from './store'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
var VueCookie = require('vue-cookie');
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted'

Vue.use(VueCookie )
Vue.use(Toasted, {
  duration: 1500,
  position: 'top-right',
  action : {
    text : 'Okay',
    onClick : (e, toastObject) => {
        toastObject.goAway(0);
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueCookie,
  render: h => h(App)
}).$mount('#app')
