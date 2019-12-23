<template>
    <div class="item-details">
        <a-row>
            <b class="detail-heading">Item Details</b>
            <a-col :span="8">
                <div class="photo-detail-container">
                    <ItemPhotoDetail
                        :images="item.images"
                        :key="item.id"
                    />
                </div>
            </a-col>
            <a-col :span="7" :offset="1">
                <p><b>Item ID:</b> {{item.id}}</p>
                <a target="_blank" :href="genUrl">View this product on the original Vendor's site <a-icon type="export"/></a><br/><br>
                <b>Tags:</b>
                <div>
                    <a-tag v-for="tag in item.tags" :key="tag">
                        {{tag}}
                    </a-tag>
                </div><br>
                <b>You can buy this item as:</b>
                <a-table 
                    :columns="detailsTableColumns" 
                    :dataSource="detailsTableData" 
                    size="small"
                    :pagination="false"
                    class="details-table"
                    >
                    <span slot="price" slot-scope="price">
                        ${{price}}
                    </span>
                    <span slot="ppg" slot-scope="variant">
                        {{(variant.price / variant.grams).toFixed(2)}}
                    </span>
                    <span slot="available" slot-scope="available">
                        <a-tag
                            :color="available ? 'green' : 'red'"
                            :key="available"
                        >
                            {{available ? 'Yes' : 'No'}}
                        </a-tag>
                    </span>
                    <!--
                    <span slot="buyit" slot-scope="variant">
                        <form :action="genVariantUrl(variant)" target="_blank">
                            <a-button type="primary" htmlType="submit" size="small">
                                Buy It!
                            </a-button>
                        </form>
                    </span>-->
                </a-table><br>
            </a-col>
            <a-col :span="8">
                <b>Vendor Description</b>
                <div v-html="item.body_html"></div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import ItemPhotoDetail from './ItemPhotoDetail'

export default {
    props: {
        item: Object
    },
    components: {
        ItemPhotoDetail
    },
    computed: {
        getQuantities: function() { 
            return this.item.options[0].values 
        },
        genUrl: function() {
            return `https://yunnansourcing.com/products/${this.item.handle}`
        },
        detailsTableColumns: function() {
            return [
                {
                    title: 'Quantity',
                    dataIndex: 'option1',
                    key: 'quantity'
                },
                {
                    title: 'Harvest',
                    dataIndex: 'option2',
                    key: 'harvest'
                },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    scopedSlots: { customRender: 'price' }
                },
                {
                    title: '$/g',
                    key: 'ppg',
                    scopedSlots: { customRender: 'ppg' }
                },
                {
                    title: 'In Stock',
                    dataIndex: 'available',
                    key: 'available',
                    scopedSlots: { customRender: 'available' }
                }
            ]
        },
        detailsTableData: function() {
            return this.item.variants
        }
    },
    methods: {
        genVariantUrl: function(variant) {
            return this.genUrl + '?variant=' + variant.id
        }
    }
}
</script>
<style scoped>
.detail-heading {
    font-size: 1.1rem;
    display: block;
    margin-bottom: .5rem;
}

.details-table {
    margin-right: 2rem;
}
</style>