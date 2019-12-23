export const filters = {
    ByFlags: function(products, flags) {
        console.log("ByFlags filtering: ", flags.toString())
        return products.filter((product) => ContainsFlag(product, flags))
    }
}

export function FilterTypes(products, flags) {
    return products.filter(product => !flags.includes(product.standard_type))
}

export function FilterPricePerGram(products, minMax) {
    return products.filter((product) => {
        const inRange = product.PPG.min >= minMax.min && product.PPG.max <= minMax.max
        if (!inRange) {
            console.log(`Removing Product: ${product.title}, PPG:`, JSON.stringify(product.PPG))
        }
        return inRange
    })
}

export function FilterFormFactor(products, toRemove) {
    return products.filter((product) => {
        return !product.formFactors.some((formFactor) => toRemove.includes(formFactor.toLowerCase()))
    })
}

function ContainsFlag(product, flags) {
    if (product.tags.some(tag => flags.includes(tag.toLowerCase()))) return false
    else if (flags.some(flag => product.title.toLowerCase().includes(flag))) return false
    else {
        console.log("Found flag")
        return true
    }
}