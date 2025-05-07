(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    let propertyTypes = data.reduce((acc, element) => {

      if(!element.propertyType) {
        return acc
      }
      
      if(!acc[element.propertyType]) {
        acc[element.propertyType] = {}
      }

      acc[element.propertyType]['quantity'] = acc[element.propertyType]['quantity'] ? acc[element.propertyType]['quantity'] + 1 : 1

      return acc
    
    }, {})

    let propertyTypesSortedByAverage = Object.entries(propertyTypes).sort(([,valueA], [,valueB]) => valueB.quantity - valueA.quantity)

    propertyTypesSortedByAverage = propertyTypesSortedByAverage.map(([key, value]) => {
      return {
        propertyType: key,
        ...value
      }
    })
    
    await fs.writeFile('../data/quantity-by-property-type.json', JSON.stringify(propertyTypesSortedByAverage, null, 2))

  } catch (error) {
    console.log(error)
  }
})()