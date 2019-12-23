export const Formatting = {
    PPG: function(minMax, unitCurrency) {
        return minMax[0] === minMax[1] || minMax.length === 1
            ? `${unitCurrency}${Math.min(...minMax).toFixed(2)}/g`
            : `${unitCurrency}${Math.min(...minMax).toFixed(2)}/g - ${unitCurrency}${Math.max(...minMax).toFixed(2)}/g`
    },
    Price: function(minMax, unitCurrency) {
        const out = minMax[0] === minMax[1]
                    ? `${unitCurrency}${minMax[0].toFixed(2)}`
                    : `${unitCurrency}${Math.min(...minMax).toFixed(2)} - ${unitCurrency}${Math.max(...minMax).toFixed(2)}`
        
        if (typeof out === Array) return 'Price Unavailable'
        return out === undefined || out === '' || out === ' '
            ? 'unavailable'
            : out
    },
    Weight: function(options) {
        var weights = options.filter(option => {
            return option.name === "Weight" || option.name === "Quantity"
        })[0].values
        return weights ? weights.join(', ') : 'weight'
    },
    Harvest:  function(harvestObj) {
        const formatSeason = harvestObj.season ? harvestObj.season : ''
        const formatYear = harvestObj.year ? harvestObj.year : ''
        return `${formatSeason} ${formatYear}`
    }
}