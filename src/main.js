import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './styles/styles.css'

import Vuex from 'vuex'
import storePlugin from './store/storePlugin'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Buefy)
Vue.use(Vuex)
Vue.use(storePlugin)


new Vue({
    render: h => h(App),
}).$mount('#app')
