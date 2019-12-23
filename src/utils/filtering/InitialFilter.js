//import { ExtractType } from '../Extraction'
import { FilterTypes, FilterPricePerGram, FilterFormFactor } from './Filter'
import { store } from '../../store/store'

export function InitialFilter(products) {
    var filtered = products
    const filterParams = store.state.filterParameters
    if (!filterParams.includeTeaware) { console.log('filtering teaware'); filtered = RemoveTeaWares(filtered) }
    if (filterParams.types) filtered = FilterTypes(filtered, filterParams.types)
    if (filterParams.formFactors) filtered = FilterFormFactor(filtered, filterParams.formFactors)
    filtered = FilterPricePerGram(filtered, filterParams.ppg)
    return filtered
}

function RemoveTeaWares(products) {
    return products.filter(product => product.standard_type !== 'Teaware')
}

/*
function ContainsFlag(product, flags) {
    if (product.tags.some(tag => flags.includes(tag.toLowerCase()))) return false
    else if (flags.some(flag => product.title.toLowerCase().includes(flag))) return false
    else return true
}*/
