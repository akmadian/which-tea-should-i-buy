import { ExtractType } from '../Extraction'
import { FilterTypes } from './Filter'

export function InitialFilter(products, additionalFlags) {
    var filtered = RemoveTeaWares(products)
    AddStandardizedType(filtered)
    if (additionalFlags) filtered = FilterTypes(filtered, additionalFlags)
    return filtered
}

function AddStandardizedType(products) {
    products.forEach((product) => {
        product.standard_type = ExtractType(product)
    })
}


function RemoveTeaWares(products) {
    const flags = ['pot', 'clay', 'gaiwan', 'table', 'ware', 'cup', 'glass', 'strainer', 'box']
    return products.filter((product) => {
        return ContainsFlag(product, flags)
    })
}

function ContainsFlag(product, flags) {
    if (product.tags.some(tag => flags.includes(tag.toLowerCase()))) return false
    else if (flags.some(flag => product.title.toLowerCase().includes(flag))) return false
    else return true
}
