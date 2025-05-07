(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    let accommodates = data.reduce((acc, element) => {

      if(!element.price) {
        return acc
      }
      
      if(!acc[element.accommodates]) {
        acc[element.accommodates] = {}
      }

      acc[element.accommodates]['quantity'] = acc[element.accommodates]['quantity'] ? acc[element.accommodates]['quantity'] + 1 : 1
      acc[element.accommodates]['total'] = acc[element.accommodates]['total'] ? acc[element.accommodates]['total'] + parseFloat(element.price.substring(1)) : parseFloat(element.price.substring(1))
      acc[element.accommodates]['average'] = parseFloat((acc[element.accommodates]['total'] / acc[element.accommodates]['quantity']).toFixed(2))

      return acc
    }, {})

    let accomodatesSortedByAverage = Object.entries(accommodates).sort(([,valueA], [,valueB]) => valueA.average - valueB.average)

    accomodatesSortedByAverage = accomodatesSortedByAverage.map(([key, value]) => {
      return {
        accommodates: key,
        ...value
      }
    })
    
    await fs.writeFile('../data/media-price-by-accommodates.json', JSON.stringify(accomodatesSortedByAverage, null, 2))

  } catch (error) {
    console.log(error)
  }
})()