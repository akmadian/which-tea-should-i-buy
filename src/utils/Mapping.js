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