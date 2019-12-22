import store from './store'
export default {
    store,
    install (Vue) {
        Vue.prototype.$store = store
        this.$store = store
    }
}