<template>
    <div id="app">
        <Title/>
        <Filtering :data="data"/>
        <RawTable :data="data"/>
        <!--<ysTable :data="data"/>-->
    </div>
</template>

<script>
/* eslint-disable no-console */
//import ysTable from './components/ysTable'
import Filtering from './components/Filtering'
import Title from './components/Title'
import RawTable from './components/RawTable'

export default {
    name: 'app',
    components: {
  //      ysTable,
        Filtering,
        Title,
        RawTable
    },
    data() {
        return {
            data: [],
            page: 1,
            loading: false
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData: async function() {
            const url = `https://yunnansourcing.com/products.json?limit=250&page=1`
            const res = await fetch(url)
            const json = await res.json()
            this.data = json.products.filter(product => !product.tags.includes('Teapot') && 
                                                        !product.tags.includes('Cups') &&
                                                        !product.tags.includes('Gaiwan') &&
                                                        !product.tags.includes('gaiwan') &&
                                                        !product.tags.includes('Strainer') &&
                                                        !product.tags.includes('Tea Table'))
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
