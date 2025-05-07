(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/tourist-accommodations.json', 'utf-8')
    const data = JSON.parse(file)

    let touristAccommodationsByNeighburhood = data.reduce((acc, element) => {

      if(!element.Municipi) {
        return acc
      }

      const neighburhood = element.Municipi.toLowerCase()
      
      if(!acc[neighburhood]) {
        acc[neighburhood] = 0
      }

      acc[neighburhood] += parseInt(element.Places)

      return acc
    }, {})

    touristAccommodationsByNeighburhood = Object.fromEntries(Object.entries(touristAccommodationsByNeighburhood).sort(([, valueA], [, valueB]) => valueB - valueA))

    await fs.writeFile('../data/tourist-accommodations-places-by-neighburhood.json', JSON.stringify(touristAccommodationsByNeighburhood, null, 2))

  } catch (error) {
    console.log(error)
  }
})()