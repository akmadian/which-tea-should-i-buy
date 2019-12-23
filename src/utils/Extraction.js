import { flags } from './Flags'
import { containsAny } from './other/containsAny'

export const Extract = {
    Type: function(product, isType = false) {
        const product_type = isType 
            ? product 
            : product.product_type.toLowerCase()
    
        let types = {
            'Sheng': flags['shengpu'],
            'Shou': flags['shoupu'],
            'Black': flags['blacktea'],
            'Green': flags['greentea'],
            'White': flags['whitetea'],
            'Oolong': flags['oolongtea'],
            'Teaware': flags['teaware']
        }

        if (product.tags.some(tag => flags['teaware'].includes(tag.toLowerCase()))) return 'Teaware'
    
        for (var type in types) { // for each type in names
            if (types.hasOwnProperty(type)) { 
                const flagFoundInTags = isType // if one of the flags for current type is found in tags
                    ? undefined 
                    : product.tags.some(tag => types[type].includes(tag.toLowerCase()))
                // If any of the flags associated with each type
                // are equal to any of the words found in the product_type
                const flagFoundInType = product_type.toLowerCase().split(' ').some(word => types[type].includes(word))

                // If any of the flags associated with each type
                // are equal to any of the tags for the given product
                if ((!isType && flagFoundInTags) || flagFoundInType) {
                    return type
                }
            }
        }
    },
    Harvest: function(product) {
        var year
        var season
    
        // Check tags for harvest
        product.tags.forEach((tag) => {
            if (!isNaN(tag)) {
                tag = parseInt(tag)
                if (tag.toString.length != 4 && 3000 > tag && tag > 1900) {
                    year = tag
                }
            }
        })
    
        // Look for harvest in options
        if (product.options) {
            if (product.options.filter(option => option.name.toLowerCase().includes('harvest')).length > 0) {
                var thing = product.options.filter(option => option.name.includes('Harvest'))[0].values
                season = thing[0].split(' ')[0]
                year = thing[0].split(' ')[1]
            }
        }
    
        product.tags.forEach((tag) => {
            if (tag.includes('Harvest')) {
                season = tag.split(' ')[0]
            } 
            /*else if (product.tags.some(tag => seasons.includes(tag.toLowerCase()))) {
                console.log("    Setting Season")
                season = tag
            }*/
        })

        return {
            year: year,
            season: season
        }
    },
    FormFactor: function(product) {
        const formFactors = flags['formFactors']
        var out = new Set()

        // search for form factors in product tags
        product.tags.forEach((tag) => {
            tag = tag.toLowerCase()
            var res = containsAny(tag, formFactors)
            if (res) out.add(res)
        })

        // search for form factors in product variants
        product.variants.forEach((variant) => {
            var variantOptions = [
                variant.title,
                variant.option1 ? variant.option1 : '',
                variant.option2 ? variant.option2 : '',
                variant.option3 ? variant.option3 : '',
            ]
            variantOptions.forEach((option) => {
                formFactors.forEach((formFactor) => {
                    if (option.toLowerCase().includes(formFactor)) {
                        out.add(formFactor)
                    }
                })
            });
        })

        if (out.size !== product.variants.length) out.add('Loose')

        /*
        product.variants.forEach((variant) => {
            var variantOptions = [variant.title, variant.option1, variant.option2, variant.option3]
            //variantOptions = variantOptions.map((option) => option ? option.toLowerCase() : '')
            formFactors.forEach((formFactor) => {
                var res = containsAny(formFactor, variantOptions)
                if (res) {
                    console.log("RES", res)
                    out.add(res.capitalize())
                }
            })
        })*/

        var outArray = Array.from(out)
        return outArray.map(ele => ele.capitalize())
    }
}
