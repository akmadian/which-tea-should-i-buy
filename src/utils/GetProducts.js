export function GetProducts(vendorUrl, args) {
    return new Promise(async function(resolve) {
        const url = `https://${vendorUrl}/products.json?${buildQueryParams(args.params)}&limit=250`
        const res = await fetch(url)
        const json = await res.json()
        resolve(json)
    })
}

function buildQueryParams(args) {
    var params = []
    Object.keys(args).forEach((key) => {
        params.push(`${key}=${args[key]}`)
    })
    return params.join('&')
}
