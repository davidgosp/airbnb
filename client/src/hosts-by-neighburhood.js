(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    let hostByNeighburhood = data.reduce((acc, element) => {
      acc[element.neighburhood] = acc[element.neighburhood] ? acc[element.neighburhood] + 1 : 1
      return acc
    }, {})
    
    await fs.writeFile('../data/hosts-by-neighburhood.json', JSON.stringify(hostByNeighburhood, null, 2))

  } catch (error) {
    console.log(error)
  }
})()