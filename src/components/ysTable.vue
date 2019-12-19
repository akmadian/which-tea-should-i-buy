<template>
  <a-table :columns="columns" :dataSource="data">
    <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-row>
            <b class="detail-heading">Item Details</b>
            <a-col :span="8">
                <div class="photo-detail-container">
                    <ItemPhotoDetail 
                        v-if="record.images"
                        :key="record.id" 
                        :images="record.images['src']" 
                        class="photo-detail"/>
                    <p v-else>Could not find images of product</p>
                </div>
            </a-col>
            <a-col :span="8">
                <p><b>Item ID:</b> {{record.id}}</p><br>
                <b>You Can Buy This Item As:</b>
                <p v-for="variant in record.variants" :key="variant.name">
                    {{variant.name}}<br>
                </p>
            </a-col>
            <a-col :span="8">
                <div>
                    {{record.vendor_description}}
                </div>
                <a :href="record.url">Visit Product Page on Vendor's Website</a>
            </a-col>
        </a-row>
    </p>
    <span slot="harvest" slot-scope="harvest">
        {{formatHarvest(harvest)}}
    </span>
    <span slot="price" slot-scope="price">
        {{genPrices(price)}}
    </span>
    <span slot="type" slot-scope="type">
        <a-tag
            :color="typeColor(type)"
            :key="type">
            {{type}}
        </a-tag>
    </span>
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :color="tag==='loser' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')"
        :key="tag"
      >
        {{tag.toUpperCase()}}
      </a-tag>
    </span>
  </a-table>
</template>
<script>
import ItemPhotoDetail from './ItemPhotoDetail'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'title',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: 'Harvest',
        key: 'harvest',
        scopedSlots: { customRender: 'harvest' }
    },
    {
        title: 'Prices',
        key: 'prices',
        scopedSlots: { customRender: 'price' }
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
    }
];

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
    props: ['data'],
    components: {
        ItemPhotoDetail
    },
    data() {
      return {
        columns,
      };
    },
    methods: {
        genPrices: function(product) {
            if (product.variants.length === 1) {
                return `$${product.variants[0].price}/ ${product.variants[0].quantity}g ${capitalize(product.variants[0].form)}`
            } else {
                var out = ''
                product.variants.forEach((variant) => {
                    out += `| $${variant.price}/ ${variant.quantity}g ${capitalize(variant.form)} `
                })
                return out
            }
        },
        typeColor: function(type) {
            switch (type) {
                case 'Black': return 'red'
                case 'Green': return 'green'
                case 'Oolong': return 'orange'
                case 'White': return 'white'
                case 'Sheng': return 'cyan'
                case 'Shou': return 'blue'
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
        }
    }
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