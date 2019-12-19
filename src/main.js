import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './styles/styles.css'
Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')