(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    let neighburhoods = data.reduce((acc, element) => {

      if(!element.price) {
        return acc
      }
      
      if(!acc[element.neighburhood]) {
        acc[element.neighburhood] = {}
      }

      acc[element.neighburhood]['quantity'] = acc[element.neighburhood]['quantity'] ? acc[element.neighburhood]['quantity'] + 1 : 1
      acc[element.neighburhood]['total'] = acc[element.neighburhood]['total'] ? acc[element.neighburhood]['total'] + parseFloat(element.price.substring(1)) : parseFloat(element.price.substring(1))
      acc[element.neighburhood]['average'] = parseFloat((acc[element.neighburhood]['total'] / acc[element.neighburhood]['quantity']).toFixed(2))

      return acc
    }, {})

    let neighburhoodsSortedByAverage = Object.entries(neighburhoods).sort(([,valueA], [,valueB]) => valueA.average - valueB.average)

    neighburhoodsSortedByAverage = neighburhoodsSortedByAverage.map(([key, value]) => {
      return {
        neighburhood: key,
        ...value
      }
    })
    
    await fs.writeFile('../data/average-price-by-neighburhood.json', JSON.stringify(neighburhoodsSortedByAverage, null, 2))

  } catch (error) {
    console.log(error)
  }
})()