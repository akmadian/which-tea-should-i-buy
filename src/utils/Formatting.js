export const Formatting = {
    PPG: function(minMax, unitCurrency) {
        return minMax[0] === minMax[1] || minMax.length === 1
            ? `${unitCurrency}${Math.min(...minMax).toFixed(2)}/g`
            : `${unitCurrency}${Math.min(...minMax).toFixed(2)}/g - ${unitCurrency}${Math.max(...minMax).toFixed(2)}/g`
    },
    /*weight: function(minMax) {

    },*/
    price: function(minMax, unitCurrency) {
        const out = minMax[0] === minMax[1]
                    ? `${unitCurrency}${minMax[0].toFixed(2)}`
                    : `${unitCurrency}${Math.min(...minMax).toFixed(2)} - ${unitCurrency}${Math.max(...minMax).toFixed(2)}`
        
        if (typeof out === Array) return 'Price Unavailable'
        return out === undefined || out === '' || out === ' '
            ? 'unavailable'
            : out
    },
    weight: function(options) {
        var weights = options.filter(option => {
            return option.name === "Weight" || option.name === "Quantity"
        })[0].values
        return weights ? weights.join(', ') : 'weight'
    }
}