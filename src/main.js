import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import { Carousel } from 'buefy'
import 'buefy/dist/buefy.css'
import './styles/styles.css'
import './utils/other/extensions'

import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Carousel)
Vue.use(Vuex)


new Vue({
    render: h => h(App),
}).$mount('#app')
