/* eslint-disable no-console */
<template>
    <div id="introview">
        <a-form :form="form" @submit="handleIntroSubmit">
            <a-row>
                <a-col :span="8" :offset="4">
                    <a-form-item label="Vendor" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                        <a-select
                            :size="InputSize" 
                            ref="IntroVendor"
                            v-decorator="[
                                'vendor',
                                { 
                                    initialValue: 'yunnansourcing.com',
                                    rules: [{required: false}]
                                }
                            ]"
                        >
                            <a-select-option value="yunnansourcing.com">Yunnan Sourcing</a-select-option>
                            <a-select-option value="yunnansourcing.us">Yunnan Sourcing US</a-select-option>
                            <a-select-option value="crimsonlotustea.com">Crimson Lotus</a-select-option>
                            <a-select-option value="what-cha.com">What-Cha</a-select-option>
                            <a-select-option value="taiwanoolongs.com">Taiwan Sourcing</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Currency" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                        <a-select
                            style="width: 120px" 
                            :size="InputSize"
                            v-decorator="[
                                'currency',
                                { 
                                    initialValue: 'USD',
                                    rules: [{required: false}]
                                }
                            ]"
                        >
                            <a-select-option value="USD">USD</a-select-option>
                            <a-select-option value="GBP">GBP</a-select-option>
                            <a-select-option value="EUR">EUR</a-select-option>
                            <a-select-option value="CNY">CNY</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Filter Types" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                        <a-select
                            mode="multiple"
                            placeholder="Filter Types"
                            style="width: 300px"
                            :allowClear="true"
                            :size="InputSize"
                            v-decorator="[
                                'types',
                                { 
                                    initialValue: [],
                                    rules: [{required: false}]
                                }
                            ]"
                        >
                            <a-select-option v-for="type in types" :key="type">
                                <a-tag
                                    :color="typeColor(type)"
                                    :key="type">
                                    {{type}}
                                </a-tag>
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
                        <a-checkbox>
                            Must Be In Stock
                        </a-checkbox>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Form Factor" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                        <a-select mode="multiple" style="width: 100%">
                            <a-select-option value="loose">Loose</a-select-option>
                            <a-select-option value="cake">Cake</a-select-option>
                            <a-select-option value="brick">Brick</a-select-option>
                            <a-select-option value="dragonballs">Dragon Balls</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Price Range" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                        <a-input-number 
                            :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                            :min="0"
                            :defaultvalue="0"
                        />
                        -
                        <a-input-number 
                            :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                            :min="0"
                            :defaultvalue="0"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
                <a-button 
                    :size="InputSize"
                    type="primary"
                    html-type="submit"
                >
                    Find Your Next Tea!
                    <a-icon type="right"/>
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
import { store } from '../store/store'
import { GetProducts } from '../utils/GetProducts'
import { InitialFilter } from '../utils/filtering/InitialFilter'

export default {
    name: 'IntroView',
    props: {
        InputSize: String
    },
    components: {
    },
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'IntroForm' }),
            types: ['Black', 'White', 'Yellow', 'Shou', 'Sheng', 'Green', 'Oolong'],
            formItemLayout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 10 }
            },
            formTailLayout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 8, offset: 4 }
            }
        }
    },
    methods: {
        handleIntroSubmit: function(e) {
            e.preventDefault()
            this.$emit('introFormSubitted')
            const values = this.form.getFieldsValue()
            console.log(values)
            GetProducts(values.vendor, 
                { 
                    params: {
                        presentment_currencies: values.currency
                    }
                }
            ).then(function(res) {
                store.commit('updateproducts', res.products)
                store.commit('updatefilteredproducts', InitialFilter(res.products, values.types))
            }).then(
                this.$emit('productsfiltered')    
            )
        },
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
        },
        /*
        GetProducts: async function(vendorUrl, args) {
            const url = `https://${vendorUrl}/products.json?${this.buildQueryParams(args.params)}`
            console.log("Built URL: ", url)
            const res = await fetch(url)
            const json = await res.json()
            return json
        },
        buildQueryParams: function(args) {
            var params = []
            console.log("Query Params: ", args)
            Object.keys(args).forEach((key) => {
                params.push(`${key}=${args[key]}`)
            })
            console.log("Built Query Params: ", params.join('&'))
            return params.join('&')
        }*/
    }
}
</script>
<style scoped>

</style>