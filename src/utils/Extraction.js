export function ExtractType(product, isType = false) {
    const type = isType 
        ? product 
        : product.product_type.toLowerCase()

    let names = {
        'Sheng': ['raw', 'sheng'],
        'Shou': ['ripe', 'cooked', 'shou', 'shu'],
        'Black': ['black'],
        'Green': ['green'],
        'White': ['white'],
        'Oolong': ['oolong', 'cong'],
        'Teaware': ['pot', 'clay', 'gaiwan', 'table', 'ware', 'cup', 'strainer']
    }

    for (var name in names) {
        if (names.hasOwnProperty(name)) {
            const flagFoundInTags = isType 
                ? undefined 
                : product.tags.some(tag => names[name].includes(tag.toLowerCase()))

            // If any of the flags associated with each type
            // are equal to any of the words found in the product_type
            const flagFoundInType = type.toLowerCase().split(' ').some(word => names[name].includes(word))
            // If any of the flags associated with each type
            // are equal to any of the tags for the given product
            if ((!isType && flagFoundInTags) || flagFoundInType) {
                return name
            }
        }
    }
}

export function ExtractHarvest(product) {
    let seasons = ['autumn', 'fall', 'spring', 'summer', 'winter']
    var year = 'year'
    var season = 'season'

    // Check tags for harvest
    product.tags.forEach((tag) => {
        if (!isNaN(tag)) {
            tag = parseInt(tag)
            if (tag.toString.length != 4 && 3000 > tag && tag > 1900) {
                year = tag
                product.year = tag
            }
        }
    })

    // Look for harvest in options
    if (product.options) {
        if (product.options.filter(option => option.name.toLowerCase().includes('harvest')).length > 0) {
            console.log(1)
            return product.options.filter(option => option.name.includes('Harvest')).values[1]    
        }
    } 

    for (var tag in product.tags) {
        if (tag.includes('Harvest')) {
            console.log(2)
            return tag.split(' ')[0]
        } else if (product.tags.some(tag => seasons.includes(tag.toLowerCase()))) {
            console.log(3)
            return 'not found'
        }

    }
    return `${season} ${year}`
}