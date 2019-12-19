<template>
    <b-table :data="data" :columns="columns"></b-table>
</template>

<script>
    import ysShou from '../ys-catalog2.json'
    export default {
        data() {
            return {
                data: ysShou.products,
                columns: [
                    {
                        field: 'name',
                        label: 'Name',
                    },
                    {
                        field: 'type_standard',
                        label: 'Type',
                    },
                    {
                        field: 'prices',
                        label: 'prices'
                    },
                    {
                        field: 'quantities',
                        label: 'quant'
                    },
                    {
                        field: 'ppg',
                        label: 'ppg'
                    },
                    {
                        field: 'year',
                        label: 'Year'
                    }
                ]
            }
        }
    }
</script>