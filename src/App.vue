<template>
    <div id="app">
        <Title/>
        <div id="intro" v-if="showIntro">
            <a-spin :spinning="store.state.loading" :tip="store.state.loadingMessage">
                <div class="spin-content">
                    <IntroView
                        v-on:productsfiltered="loadingFinish()"
                        v-on:introFormSubmitted="handleIntroFormSubmit()"
                    />
                </div>
            </a-spin>
        </div>
        <div id="tablecontainer">
            <TableView/>
        </div>
    </div>
</template>

<script>
import Title from './components/Title'
import IntroView from './views/IntroView'
import TableView from './views/TableView'
import { store } from './store/store'

//import Vue from 'vue'

export default {
    name: 'app',
    components: {
        Title,
        IntroView,
        TableView
    },
    data() {
        return {
            store: store,
            customSpinnerIndicator: <a-icon type="loading" spin/>,
            tableLoading: false,
            showIntro: true
        }
    },
    methods: {
        /*
        setToTableView: function() {
            const ComponentInstance = new Vue({
                ...TableView
            })
            ComponentInstance.$mount('#tablecontainer');
        },*/
        handleIntroFormSubmit: function() {
            this.formSubmitted = true
            this.tableLoading = true
        },
        loadingFinish: function() {
            this.showIntro = false
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 3rem 0 3rem;
}
</style>
