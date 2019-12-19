function typeToColor(type) {
    switch (type) {
        case 'Black': return 'red'
        case 'Green': return 'green'
        case 'Oolong': return 'orange'
        case 'White': return 'white'
        case 'Sheng': return 'cyan'
        case 'Shou': return 'blue'
        default:
            break;
    }
}

export default { typeToColor }