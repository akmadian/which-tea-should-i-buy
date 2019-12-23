import { Extract } from './Extraction'
import { ItemProperties } from './ItemProperties'

export function AddCustomData(products) {
    products.forEach((product) => {
        const PPG = ItemProperties.minMaxPPG(product)
        product.PPG = {
            min: Math.min(...PPG),
            max: Math.max(...PPG)
        }
        product.standard_type = Extract.Type(product)
        if (product.standard_type !== 'Teaware') {
            product.formFactors = Extract.FormFactor(product)
            product.harvest = Extract.Harvest(product)
        }
    })
}