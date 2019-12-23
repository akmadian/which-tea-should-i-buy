export function TypeToColor(type) {
    switch (type) {
        case 'Black': return 'red'
        case 'Green': return 'green'
        case 'Oolong': return 'orange'
        case 'Sheng': return 'cyan'
        case 'Shou': return 'blue'
        case 'Teaware': return 'purple'
        default:
            break;
    }
}

export function StandardizeIntroFormFilter(values) {
    values.inputChecks = []
    return {
        ppg: {
            min: values.minPPG,
            max: values.maxPPG
        },
        price: {
            min: values.minPrice,
            max: values.maxPrice
        },
        years: {
            min: values.minHarvestYear,
            max: values.maxHarvestYear
        },
        mustHaveSample: values.inputChecks.includes('mustHaveSample'),
        mustBeInStock: values.inputChecks.includes('mustBeInStock'),
        mustBeOrganic: values.inputChecks.includes('mustBeOrganic'),
        includeTeaware: values.inputChecks.includes('includeTeaware'),
        //includeTeaware: true,
        types: values.types,
        formFactors: values.formFactors,
    }
}

export function YSStandardTypetoType(type) {
    switch (type) {
        case 'Oolong': return 'Oolong Tea'
        case 'White': return 'White Tea'
        case 'Black': return 'Black Tea'
        case 'Shou': return 'Ripe Pu-erh Tea'
        case 'Sheng': return 'Raw Pu-erh Tea'
        case 'Yellow': return 'Yellow Tea'
        case 'Green': return 'Green Tea'
        default:
            break;
    }
}