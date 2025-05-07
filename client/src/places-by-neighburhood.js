(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    let placesByNeighburhood = data.reduce((acc, element) => {
      acc[element.neighburhood] = acc[element.neighburhood] ? acc[element.neighburhood] + parseInt(element.accommodates) : parseInt(element.accommodates)
      return acc
    }, {})

    placesByNeighburhood = Object.fromEntries(Object.entries(placesByNeighburhood).sort(([,valueA],[,valueB]) => valueB - valueA))
    
    await fs.writeFile('../data/places-by-neighburhood.json', JSON.stringify(placesByNeighburhood, null, 2))

  } catch (error) {
    console.log(error)
  }
})()