async function getData(size, page) {
    const url = `https://yunnansourcing.com/collections/ripe-pu-erh/products.json?limit=${size}&page=${page}`
    const res = await fetch(url)
    return await res.json()
}

export default { getData }