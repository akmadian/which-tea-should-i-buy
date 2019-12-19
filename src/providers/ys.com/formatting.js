function formatType(type) {
    type = type.toLowerCase()
    if (type.includes('raw')) return 'Sheng'
    else if (type.includes('ripe')) return 'Shou'
    else if (type.inclides('black')) return 'Black'
    else if (type.inclides('green')) return 'Green'
    else if (type.inclides('white')) return 'White'
    else if (type.inclides('yellow')) return 'Yellow'
    else if (type.inclides('Oolong')) return 'Oolong'
    else return null
}

export default { formatType }