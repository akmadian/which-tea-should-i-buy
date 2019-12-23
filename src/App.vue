<template>
    <div id="app">
        <Title/>
        <IntroView 
            InputSize="large"
            v-on:productsfiltered="setToTableView()"
            @introFormSubmitted="formSubmitted = true"
        />
        <a-spin
            v-if="formSubmitted"
            :tip="store.state.loadingMessage"
            :indicator="customSpinnerIndicator"
            size="large"
        />
        <div id="tablecontainer">

        </div>
    </div>
</template>

<script>
import Title from './components/Title'
import IntroView from './views/IntroView'
import TableView from './views/TableView'
import { store } from './store/store'

import Vue from 'vue'

export default {
    name: 'app',
    components: {
        Title,
        IntroView
    },
    data() {
        return {
            store: store,
            customSpinnerIndicator: <a-icon type="loading" spin/>,
            formSubmitted: false
        }
    },
    methods: {
        setToTableView: function() {
            const ComponentInstance = new Vue({
                ...TableView
            })
            ComponentInstance.$mount('#tablecontainer');
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 3rem 0 3rem;
}
</style>
