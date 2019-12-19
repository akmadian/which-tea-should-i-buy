<template>
    <a-table :columns="columns" :dataSource="this.$props.data" :rowKey="record => record.id">
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
            <ItemDetails :item="record"/>
        </p>
        <span slot="name" slot-scope="name" :key="name">
            <b>{{name}}</b>
        </span>
        <span slot="type" slot-scope="type">
            <a-tag
                :color="typeToColor(formatType(type))"
                :key="type">
                {{formatType(type)}}
            </a-tag>
        </span>
        <span slot="price" slot-scope="variants">
            {{`$${minMaxPrice(variants)[0]} - $${minMaxPrice(variants)[1]}`}}
        </span>
        <span slot="weight" slot-scope="variants">
            {{`${minMaxWeight(variants)[0]}g - ${minMaxWeight(variants)[1]}g`}}
        </span>
        <span slot="ppg" slot-scope="variants">
            {{`$${minMaxPPG(variants)[0].toFixed(2)} - $${minMaxPPG(variants)[1].toFixed(2)}`}}
        </span>
        <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag">{{tag}}</a-tag>
        </span>
        <span slot="buyit" slot-scope="handle">
            <form :action="genItemUrl(handle)" target="_blank">
                <a-button type="primary" htmlType="submit" size="small">
                    Buy It!
                </a-button>
            </form>
        </span>
    </a-table>
</template>
<script>
import ItemDetails from './ItemDetails'

const columns = [
    {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: 'Type',
        dataIndex: 'product_type',
        key: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: 'Price',
        dataIndex: 'variants',
        key: 'price',
        scopedSlots: { customRender: 'price' }
    },
    {
        title: 'Weight',
        dataIndex: 'variants',
        key: 'weight',
        scopedSlots: { customRender: 'weight' }
    },
    {
        title: '$/g',
        dataIndex: 'variants',
        key: 'ppg',
        scopedSlots: { customRender: 'ppg' }
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        scopedSlots: { customRender: 'tags' }
    },
    {
        title: 'Buy It!',
        dataIndex: 'handle',
        key: 'buyit',
        scopedSlots: { customRender: 'buyit' }
    }
];

export default {
    props: {
        data: Array
    },
    components: {
        ItemDetails
    },
    data() {
      return {
        columns,
      };
    },
    methods: {
        formatType: function(type) {
            type = type.toLowerCase()
            if (type.includes('raw')) return 'Sheng'
            else if (type.includes('ripe')) return 'Shou'
            else if (type.includes('black')) return 'Black'
            else if (type.includes('green')) return 'Green'
            else if (type.includes('white')) return 'White'
            else if (type.includes('yellow')) return 'Yellow'
            else if (type.includes('oolong') || type.includes('cong')) return 'Oolong'
            else if (type.includes('pot') || type.includes('clay') ||
                     type.includes('gaiwan') || type.includes('table') || 
                     type.includes('ware') || type.includes('cup')) {
                return 'Teaware'
            } 
            else return 'Other'
        },
        typeToColor: function(type) {
            switch (type) {
                case 'Black': return 'red'
                case 'Green': return 'green'
                case 'Oolong': return 'orange'
                case 'White': return 'white'
                case 'Sheng': return 'cyan'
                case 'Shou': return 'blue'
                case 'Teaware': return 'purple'
                default:
                    break;
            }
        },
        formatPPG: function(val) {
            if (!isNaN(parseFloat(val)) && !isNaN(val - 0)) {
                return '$' + val
            }
            else return '$' + `${Math.min(...val)}-${Math.max(...val)}`
        },
        formatHarvest: function(product) {
            if (product.season === null) {
                return product.year
            } 
            else {
                return `${product.season} ${product.year}`
            }
        },
        minMaxPrice: function(variants) {
            var prices = variants.map(variant => parseInt(variant.price))
            return [Math.min(...prices), Math.max(...prices)]
        },
        minMaxWeight: function(variants) {
            var weights = variants.map(variant => parseInt(variant.grams))
            return [Math.min(...weights), Math.max(...weights)]
        },
        minMaxPPG: function(variants) {
            const mmprice = this.minMaxPrice(variants)
            const mmweight = this.minMaxWeight(variants)
            return [
                mmprice[0] / mmweight[0],
                mmprice[1] / mmweight[1]
            ]
        },
        genItemUrl: function(handle) {
            return `https://yunnansourcing.com/products/${handle}`
        }
    },
};
</script>
<style scoped>
.detail-heading {
    font-size: 1.1rem;
    display: block;
    margin-bottom: .5rem;
}

.photo-detail-container {
    margin: 0 1rem 0 0;
    display: inline-block;
}
</style>