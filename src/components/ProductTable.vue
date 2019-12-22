<template>
    <a-table 
        :columns="columns" 
        :dataSource="store.getters.filteredProducts" 
        :rowKey="record => record.id"
        :expandRowByClick="true">
        <a-empty></a-empty>
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
            <ItemDetails :item="record"/>
        </p>
        <span slot="name" slot-scope="name" :key="name">
            <b>{{name}}</b>
        </span>
        <span slot="type" slot-scope="type">
            <a-tag
                :color="TypeToColor_(type)"
                :key="type">
                {{type}}
            </a-tag>
        </span>
        <span slot="harvest" slot-scope="product">
            {{ ExtractHarvest_(product) }}
        </span>
        <span slot="price" slot-scope="product">
            {{
                Formatting_.price(
                    ItemProperties_.minMaxPrice(product),
                    store.state.selectedCurrency.symbol
                )
            }}
        </span>
        <span slot="weight" slot-scope="product">
            {{Formatting_.weight(product.options)}}
        </span>
        <span slot="ppg" slot-scope="product">
            {{ 
                Formatting_.PPG(
                    ItemProperties_.minMaxPPG(product), 
                    store.state.selectedCurrency.symbol
                ) 
            }}
        </span>
        <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag">{{tag}}</a-tag>
        </span>
        <span slot="buyit">
            url
            <!-- slot-scope="handle"
            <form :action="genItemUrl(handle)" target="_blank">
                <a-button type="primary" htmlType="submit" size="small">
                    Buy It!
                </a-button>
            </form>-->
        </span>
    </a-table>
</template>
<script>
import ItemDetails from './ItemDetails'
import { TypeToColor } from '../utils/Mapping'
import { ExtractType, ExtractHarvest } from '../utils/Extraction'
import { ItemProperties } from  '../utils/ItemProperties'
import { Formatting } from '../utils/Formatting'
import { store } from '../store/store'

const columns = [
    {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: 'Type',
        dataIndex: 'standard_type',
        key: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: 'Harvest',
        key: 'harvest',
        scopedSlots: { customRender: 'harvest' }
    },
    {
        title: 'Price',
        key: 'price',
        scopedSlots: { customRender: 'price' }
    },
    {
        title: 'Weight',
        key: 'weight',
        scopedSlots: { customRender: 'weight' }
    },
    {
        title: '$/g',
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
    components: {
        ItemDetails
    },
    data() {
        return {
            columns,
            store: store,
            ItemProperties_: ItemProperties,
            Formatting_: Formatting
        };
    },
    mounted: function() {
    },
    methods: {
        TypeToColor_: TypeToColor,
        ExtractType_: ExtractType,
        ExtractHarvest_: ExtractHarvest
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