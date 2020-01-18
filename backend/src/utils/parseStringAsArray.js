module.exports = function parsetStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim())
}