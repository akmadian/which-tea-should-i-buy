<template>
    <div>
        <div id="data-stats">
            <a-row>
                <a-col :span="6">
                    <a-statistic title="Lowest $/g" :value="ppgMinMax[0]" :precision="2"/>
                </a-col>
                <a-col :span="6">
                    <a-statistic title="Highest $/g" :value="ppgMinMax[1]" :precision="2"/>
                </a-col>
                <a-col :span="6">
                    <a-statistic title="Total Products" :value="nProducts"/>
                </a-col>
                <a-col :span="6">
                    <a-statistic title="Average $/g" :value="ppgAverage" :precision="2"/>
                </a-col>
            </a-row>
        </div>
        <div id="filtering">
            <a-divider orientation="left"><b>Filter</b></a-divider>
            <a-form>
                <a-row>
                    <a-col :span="8">
                        <a-form-item label="Year" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                            <a-select
                                mode="multiple"
                                placeholder="Filter Years"
                                style="width: 200px"
                                :allowClear="true"
                            >
                                <a-select-option v-for="year in years" :key="year">
                                    {{year}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                         <a-form-item label="Price per gram range" :label-col="{ span: 7 }" :wrapper-col="{ span: 10 }">
                            <a-input-number
                                :defaultValue="ppgMinMax[0]"
                                :min="ppgMinMax[0]"
                                :max="ppgMinMax[1] - .01"
                                :formatter="value => `$ ${value}`"
                            />
                            -
                            <a-input-number
                                :defaultValue="ppgMinMax[1]"
                                :min="ppgMinMax[0] + .01"
                                :max="ppgMinMax[1]"
                                :formatter="value => `$ ${value}`"
                            />
                         </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Types" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                            <a-select
                                mode="multiple"
                                placeholder="Filter Types"
                                style="width: 300px"
                                :allowClear="true"
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
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="6">
                        <a-checkbox >Must have Sample Available</a-checkbox><br>
                        <a-checkbox @change="onChangeExcludeTeaCheck">Exclude Tea</a-checkbox>
                        <a-checkbox 
                            :defaultChecked="true"
                            @change="onChangeExcludeTeawareCheck"
                        >
                            Exclude Teaware
                        </a-checkbox>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="All Tags" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                            <a-select
                                mode="multiple"
                                placeholder="Filter Tags"
                                style="width: 300px"
                                :allowClear="true"
                            >
                                <a-select-option v-for="tag in allTags" :key="tag">
                                    <a-tag
                                        :key="tag">
                                        {{tag}}
                                    </a-tag>
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="Select Currency" :label-col="{ span: 8 }" :wrapper-col="{ span: 7 }">
                            <a-select defaultValue="USD - $" style="width: 120px">
                                <a-select-option value="USD">USD - $</a-select-option>
                                <a-select-option value="GBP">GBP - &pound;</a-select-option>
                                <a-select-option value="EUR">EUR - &euro;</a-select-option>
                                <a-select-option value="CNY">CNY - &yen;</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-popconfirm
                            title="Are you sure reset all filters?"
                            okText="Yes"
                            cancelText="No"
                        >
                            <a-icon slot="icon" type="question-circle-o" style="color: red" />
                            <a-button type="danger">Reset All Filters</a-button>
                        </a-popconfirm>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="4">
                        
                    </a-col>
                    <a-col :span="4">
                        
                    </a-col>
                    <a-col :span="4">
                        
                    </a-col>
                    <a-col :span="4">
                        
                    </a-col>
                    <a-col :span="4">
                        
                    </a-col>
                    <a-col :span="4">
                        
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        typeColor: function(type) {
            switch (type) {
                case 'Black': return 'red'
                case 'Green': return 'green'
                case 'Oolong': return 'orange'
                case 'Sheng': return 'cyan'
                case 'Shou': return 'blue'
                case 'Teaware': return 'purple'
                default:
                    break;
            }
        },
        formatType: function(type) {
            type = type.toLowerCase()
            if (type.includes('raw')) return 'Sheng'
            else if (type.includes('ripe')) return 'Shou'
            else if (type.includes('black')) return 'Black'
            else if (type.includes('green')) return 'Green'
            else if (type.includes('white')) return 'White'
            else if (type.includes('yellow')) return 'Yellow'
            else if (type.includes('Oolong')) return 'Oolong'
            else if (type.includes('pot') || type.includes('clay') ||
                     type.includes('gaiwan') || type.includes('table') || 
                     type.includes('ware') || type.includes('cup')) {
                return 'Teaware'
            } 
            else return null
        },
        onChangeExcludeTeaCheck (event) {
            this.$emit('excludeTeaCheckChange', event)
        },
        onChangeExcludeTeawareCheck (event) {
            this.$emit('excludeTeawareCheckChange', event)
        }
    },
    computed: {
        allTags: function() {
            var out = []
            this.data.forEach((product) => {
                product.tags.forEach((tag) => {
                    if (!out.includes(tag)) {
                        out.push(tag)
                    }
                })
            })
            return out
        },
        nProducts: function() {
            return this.data.length
        },
        years: function() {
            var out = []
            this.data.forEach((product) => {
                if (product.options[2]) {
                    const year = product.options[2].values[0].split(" ")[1]
                    if (!out.includes(year)) {
                        out.push(year)
                    }
                }
            })
            return out
        },
        types: function() {
            var out = []
            this.data.forEach((product) => {
                if (!out.includes(this.formatType(product.product_type))) {
                    out.push(this.formatType(product.product_type))
                }
            })
            return out
        },
        ppgs: function() {
            var out = []
            this.data.forEach((product) => {
                product.variants.forEach((variant) => {
                    const ppg = variant.price / variant.quantity
                    if (ppg < 100 && ppg > 0) {
                        out.push(ppg)
                    }
                })
            })
            return out
        },
        ppgMinMax: function() {
            return [Math.min(...this.ppgs), Math.max(...this.ppgs)]
        },
        ppgAverage: function() {
            //let sum = this.ppgs.reduce((prev, curr) => curr + prev)
            //return sum / this.ppgs.length
            return 0
        }
    }
}
</script>
<style scoped>
    #filtering {
        margin-bottom: 2rem;
    }
</style>