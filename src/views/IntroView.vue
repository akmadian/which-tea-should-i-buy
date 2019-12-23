/* eslint-disable no-console */
<template>
    <div id="introview">
        <a-form id="introform" :form="form" :layout="formLayout" @submit="handleIntroSubmit">
            <!--
            <a-row>
                <a-col :span="8" :offset="4">-->
            <a-form-item v-bind="formItemLayout">
                <span slot="label">
                    Vendor&nbsp;
                    <a-tooltip title="Only Shopify-based vendors are available right now, support for others are being added!">
                        <a-icon type="question-circle-o"/>
                    </a-tooltip>
                </span>
                <a-select
                    :size="InputSize" 
                    ref="IntroVendor"
                    v-decorator="genInputDecorator('vendor', 'yunnansourcing.com')"
                >
                    <a-select-option value="yunnansourcing.com">Yunnan Sourcing</a-select-option>
                    <a-select-option value="yunnansourcing.us">Yunnan Sourcing US</a-select-option>
                    <a-select-option value="crimsonlotustea.com">Crimson Lotus</a-select-option>
                    <a-select-option value="what-cha.com">What-Cha</a-select-option>
                    <a-select-option value="taiwanoolongs.com">Taiwan Sourcing</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Currency" v-bind="formItemLayout">
                <a-select
                    style="width: 120px" 
                    :size="InputSize"
                    v-decorator="genInputDecorator('currency', 'USD')"
                >
                    <a-select-option value="USD">USD</a-select-option>
                    <a-select-option value="GBP">GBP</a-select-option>
                    <a-select-option value="EUR">EUR</a-select-option>
                    <a-select-option value="CNY">CNY</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Filter Types" v-bind="formItemLayout" extra="Selected Types Will be Removed">
                <a-select
                    mode="multiple"
                    placeholder="Filter Types"
                    style="width: 100%"
                    :allowClear="true"
                    :size="InputSize"
                    v-decorator="genInputDecorator('types', [])"
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
            <a-form-item label="Form Factor" v-bind="formItemLayout" extra="Selected Forms Will be Removed">
                <a-select 
                    mode="multiple" 
                    style="width: 100%"
                    placeholder="Filter Form Factors"
                    :allowClear="true"
                    :size="InputSize"
                    v-decorator="genInputDecorator('formFactors', [])"
                >
                    <a-select-option value="loose">Loose</a-select-option>
                    <a-select-option value="cake">Cake</a-select-option>
                    <a-select-option value="brick">Brick</a-select-option>
                    <a-select-option value="tuo">Tuo</a-select-option>
                    <a-select-option value="dragonballs">Dragon Balls</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="Harvest Year"
                v-bind="formItemLayout"
                style="margin-bottom:0;"
                >
                <!--
                <a-checkbox :style="{display: 'block'}">
                    Must be harvested in {{new Date().getFullYear()}}
                </a-checkbox>-->
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                    <a-input-number
                        :disabled="!enableYearRange"
                        :min="1900"
                        :style="{ width: '100%'}"
                        v-decorator="genInputDecorator('minHarvestYear', 1900)"
                    />
                </a-form-item>
                <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
                    -
                </span>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                    <a-input-number 
                        :disabled="!enableYearRange"
                        :min="0"
                        :max="new Date().getFullYear()"
                        :style="{ width: '100%' }"
                        v-decorator="genInputDecorator('maxHarvestYear', new Date().getFullYear())"
                    />
                </a-form-item>
            </a-form-item>
            <a-form-item
                label="Price Range"
                v-bind="formItemLayout"
                style="margin-bottom:0;"
                >
                <a-checkbox :style="{ display: 'block'}" @change="enableMaxPrice = !enableMaxPrice">
                    Enable Max Price
                </a-checkbox>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)'}">
                    <a-input-number 
                        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                        :min="0"
                        :style="{ width: '100%'}"
                        v-decorator="genInputDecorator('minPrice', 0)"
                    />
                </a-form-item>
                <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
                    -
                </span>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)'}">
                    <a-input-number 
                        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                        :min="0"
                        :style="{ width: '100%'}"
                        :disabled="!enableMaxPrice"
                        v-decorator="genInputDecorator('maxPrice', Infinity)"
                    />
                </a-form-item>
            </a-form-item>
            <a-form-item
                label="$/g Range"
                v-bind="formItemLayout"
                style="margin-bottom:0;"
                >
                <a-checkbox :style="{ display: 'block'}" @change="enableMaxPPG = !enableMaxPPG">
                    Enable Max Price per Gram
                </a-checkbox>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                    <a-input-number 
                        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                        :min="0"
                        :step=".01"
                        :style="{ width: '100%'}"
                        v-decorator="genInputDecorator('minPPG', 0)"
                    />
                </a-form-item>
                <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
                    -
                </span>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                    <a-input-number 
                        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                        :min="0"
                        :step=".01"
                        :style="{ width: '100%' }"
                        :disabled="!enableMaxPPG"
                        v-decorator="genInputDecorator('maxPPG', Infinity)"
                    />
                </a-form-item>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
                <a-checkbox-group 
                    style="width: 100%"
                    v-decorator="['inputChecks']">
                    <a-row>
                        <a-col :span="12">
                            <a-checkbox 
                                value="mustBeInStock" >
                                Must Be In Stock
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox 
                                value="includeTeaware">
                                Include Teaware
                            </a-checkbox>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <a-checkbox 
                                value="mustHaveSample">
                                Must Have Sample
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox 
                                value="mustBeOrganic">
                                Must be Organic
                            </a-checkbox>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
            </a-form-item>
                    <!--
                </a-col>
            </a-row>-->
            <a-form-item v-bind="tailFormItemLayout">
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
import { StandardizeIntroFormFilter } from '../utils/Mapping'
import { AddCustomData } from '../utils/AddCustomData'

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
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                    lg: { span: 4 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                    lg: { span: 20 }
                },
            },
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                    md: {
                        span: 16,
                        offset: 4
                    },
                    lg: {
                        span: 16,
                        offset: 4
                    }
                },
            },
            priceRangeConfig: {
                rules: [{
                    type: 'array',
                    required: false,
                    message: 'Please select price!'
                }]
            },
            rangeConfig: {
                rules: [{ type: 'array', message: 'Please select time!' }],
            },
            enableMaxPrice: false,
            enableMaxPPG: false,
            enableYearRange: false,
        }
    },
    methods: {
        handleIntroSubmit: function(e) {
            e.preventDefault()
            store.commit('updateLoading', true)
            const values = this.form.getFieldsValue()
            GetProducts(values.vendor, 
                { 
                    params: {
                        presentment_currencies: values.currency
                    }
                }
            )
            .then((res) => {
                console.log('Adding Custom Data...')
                AddCustomData(res.products)
                return res
            })
            .then((res) => {
                console.log('Custom Data Added')
                store.commit('updateFilterParams', StandardizeIntroFormFilter(values))
                store.commit('updateproducts', res.products)
                return res
            })
            .then((res) => {
                console.log(res)
                store.commit('updatefilteredproducts', InitialFilter(res.products, values.types))
            })
            .then(
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
        genInputDecorator: function(name, initialValue, rules) {
            return [
                name,
                {
                    initialValue: initialValue,
                    rules: [
                        {   
                            required: rules ? rules : false
                        }
                    ]
                }
            ]
        }
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
#introview {
    margin-left: 20%;
    margin-right: 20%;
}

#introform {
    width: 50%
}
</style>