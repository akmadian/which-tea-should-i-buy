export function GetProducts(vendorUrl, args) {
    console.log('FETCHING CATALOG')

    args.collections = ['black-tea', 'white-tea']
    var urls = buildUrls(vendorUrl, args.collections)
    console.log(urls)

    return new Promise(async function(resolve) {
        var productCatalog = []
        for (var url in urls) {
            const res = await fetch(urls[url])
            const json = await res.json()
            productCatalog = productCatalog.concat(json.products)
        }
        resolve({products: productCatalog})
    })
}

function buildUrls(url, collections) {
    var out = []
    const template = `https://${url}{collection}/products.json?limit=250`
    if (collections) {
        collections.forEach(collection => {
            out.push(template.replace('{collection}', `/collections/${collection}`))
        })
    } else {
        out.push(template.replace('{collection}', ''))
    }
    return out
}

/*
function buildQueryParams(args) {
    var params = []
    Object.keys(args).forEach((key) => {
        params.push(`${key}=${args[key]}`)
    })
    return params.join('&')
}*/
