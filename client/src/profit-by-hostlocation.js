(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/guaranteed-minimum-profit.json', 'utf-8')
    const data = JSON.parse(file)

    let profitByHostlocation = data.reduce((acc, element) => {

      if(!acc['spain'] || !acc['foreign'] || !acc['unknown']) {
        acc['spain'] = []
        acc['foreign'] = []
        acc['unknown'] = []
      }

      if(!element.hostLocation) {
        acc['unknown'].push(element)
      }
      else if(element.hostLocation.includes('Spain')) {
        acc['spain'].push(element)
      } 
      else {
        acc['foreign'].push(element)
      }

      return acc
    }, {})

    const totals = {
      spain: profitByHostlocation['spain'].reduce((acc, element) => acc + element.profit, 0),
      foreign: profitByHostlocation['foreign'].reduce((acc, element) => acc + element.profit, 0),
      unknown: profitByHostlocation['unknown'].reduce((acc, element) => acc + element.profit, 0)
    }

    await fs.writeFile('../data/profit-by-hostlocation.json', JSON.stringify(totals, null, 2))

  } catch (error) {
    console.log(error)
  }
})()