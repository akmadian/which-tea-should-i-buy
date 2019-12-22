export const filters = {
    ByFlags: function(products, flags) {
        console.log("ByFlags filtering: ", flags.toString())
        return products.filter((product) => ContainsFlag(product, flags))
    }
}

export function FilterTypes(products, flags) {
    return products.filter(product => !flags.includes(product.standard_type))
}

function ContainsFlag(product, flags) {
    if (product.tags.some(tag => flags.includes(tag.toLowerCase()))) return false
    else if (flags.some(flag => product.title.toLowerCase().includes(flag))) return false
    else {
        console.log("Found flag")
        return true
    }
}