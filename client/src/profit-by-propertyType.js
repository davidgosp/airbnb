(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/guaranteed-minimum-profit.json', 'utf-8')
    const data = JSON.parse(file)

    let profitByHostlocation = data.reduce((acc, element) => {

      if(!acc[element.propertyType]) {
        acc[element.propertyType] = []
      }

      acc[element.propertyType].push(element)

      return acc
    }, {})

    let totals = Object.keys(profitByHostlocation).reduce((acc, key) => {
      acc[key] = profitByHostlocation[key].reduce((acc, element) => acc + element.profit, 0)
      return acc
    }, {})

    //sort the totals object by profit
    totals = Object.entries(totals).sort((a, b) => b[1] - a[1])
    totals = Object.fromEntries(totals)

    await fs.writeFile('../data/profit-by-propertyType.json', JSON.stringify(totals, null, 2))

  } catch (error) {
    console.log(error)
  }
})()