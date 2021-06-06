module.exports = (data) => {
    const arr = (typeof data == "string" ? [data] : data)
    return arr.map( i => parseInt(i))
}