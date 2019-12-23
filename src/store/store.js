import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        products: {},
        filteredProducts: {},
        filterParameters: {
            ppg: {
                min: 0,
                max: Infinity
            },
            price: {
                min: 0,
                max: Infinity
            },
            years: {
                min: 1900,
                max: new Date().getFullYear()
            },
            mustHaveSample: false,
            mustBeInStock: false,
            mustBeOrganic: false,
            includeTeaware: false,
            types: [],
            formFactors: []
        },
        selectedCurrency: {
            ISC_CODE: "USD",
            symbol: "$"
        },
        loading: false,
        loadingMessage: 'Loading...'
    },
    computed: {
        filteredProducts: (state) => state.filteredProducts
    },
    mutations: {
        updateproducts(state, newProducts) {
            state.products = newProducts
        },
        updatefilteredproducts(state, newProducts) {
            state.filteredProducts = newProducts
        },
        updateFilterParams(state, newParams) {
            state.filterParameters = newParams
        },
        updateLoadingMessage(state, newMessage) {
            state.loadingMessage = newMessage
        },
        updateLoading(state, newVal) {
            console.log('Upate loading triggered: ', newVal)
            state.loading = newVal
        }
    },
    getters: {
        products: state => state.filteredProducts,
        filteredProducts: (state) => {
            return state.filteredProducts
        }
    }
})