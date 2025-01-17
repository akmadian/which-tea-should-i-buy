export const ItemProperties = {
    formatPPG: function(val) {
        if (!isNaN(parseFloat(val)) && !isNaN(val - 0)) {
            return '$' + val
        }
        else return '$' + `${Math.min(...val)}-${Math.max(...val)}`
    },
    ProductHarvest: function() {
        // param: product
        return null
        /*
        if (product.harvest.season === null) {
            return product.year
        } 
        else {
            return `${product.season} ${product.year}`
        }*/
    },
    minMaxPrice: function(product) {
        try {
            var prices = product.variants.map(variant => parseInt(variant.price))
            return [Math.min(...prices).toFixed(2), Math.max(...prices).toFixed(2)]
        } catch (err) {
            console.log("Odd Product: ", product)
            console.log(err)
            return [0, 500]
        }
    },
    minMaxWeight: function(product) {
        try {
            var weights = product.variants.map(variant => parseInt(variant.grams))
            return [Math.min(...weights), Math.max(...weights)]
        } catch (err) {
            console.log("Odd Product: ", product)
            console.log(err)
            return [0, 500]
        }
    },
    minMaxPPG: function(product) {
        try {
            const mmprice = this.minMaxPrice(product)
            const mmweight = this.minMaxWeight(product)
            const out = [
                mmprice[0] / mmweight[0],
                mmprice[1] / mmweight[1]
            ]
            return out
        } catch (err) {
            console.log("Odd Product: ", product)
            console.log(err)
            return [0, 1]
        }
    },
    genItemUrl: function(product) {
        return `https://yunnansourcing.com/products/${product.handle}`
    }
}