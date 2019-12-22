<template>
    <a-select
        mode="multiple"
        placeholder="Filter Types"
        style="width: 300px"
        :allowClear="true"
        :size="size"
    >
        <a-select-option v-for="type in types" :key="type">
            <a-tag
                :color="typeColor(type)"
                :key="type">
                {{type}}
            </a-tag>
        </a-select-option>
    </a-select>
</template>
<script>
export default {
    name: 'TypeTagInput',
    props: {
        types: Array,
        size: String
    },
    methods: {
        typeColor: function(type) {
            switch (type) {
                case 'Black': return 'red'
                case 'Green': return 'green'
                case 'Oolong': return 'orange'
                case 'Yellow': return 'yellow'
                case 'Sheng': return 'cyan'
                case 'Shou': return 'blue'
                case 'Teaware': return 'purple'
                default:
                    return null
            }
        }
    }
}
</script>
<style scoped>

</style>