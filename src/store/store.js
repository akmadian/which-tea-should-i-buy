import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        products: {},
        filteredProducts: {},
        filterParameters: {
            lowPPG: undefined,
            highPPG: undefined,
            selectedCurrency: '',
            mustHaveSample: false,
            mustBeOrganic: false,
            years: [],
            types: [],
            tags: [],
        },
        selectedCurrency: {
            ISC_CODE: "USD",
            symbol: "$"
        },
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
        }
    },
    getters: {
        products: state => state.filteredProducts,
        filteredProducts: (state) => {
            return state.filteredProducts
        }
    }
})