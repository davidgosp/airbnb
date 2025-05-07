(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/guaranteed-minimum-profit.json', 'utf-8')
    const data = JSON.parse(file)

    let profitByHostlocation = data.reduce((acc, element) => {

      if(!acc['spain'] || !acc['foreign'] || !acc['unknown']) {
        acc['spain'] = {}
        acc['foreign'] = {}
        acc['unknown'] = {}
      }

      if(!acc['spain'][element.neighburhood] || !acc['foreign'][element.neighburhood] || !acc['unknown'][element.neighburhood]) {
        acc['spain'][element.neighburhood] = []
        acc['foreign'][element.neighburhood] = []
        acc['unknown'][element.neighburhood] = []
      }

      if(!element.hostLocation) {
        acc['unknown'][element.neighburhood].push(element)
      }
      else if(element.hostLocation.includes('Spain')) {
        acc['spain'][element.neighburhood].push(element)
      } 
      else {
        acc['foreign'][element.neighburhood].push(element)
      }

      return acc
    }, {})

    const totals = {
      spain: Object.keys(profitByHostlocation['spain']).reduce((acc, neighburhood) => {
        acc[neighburhood] = profitByHostlocation['spain'][neighburhood].reduce((acc, element) => acc + element.profit, 0)
        return acc
      }, {}),
      foreign: Object.keys(profitByHostlocation['foreign']).reduce((acc, neighburhood) => {
        acc[neighburhood] = profitByHostlocation['foreign'][neighburhood].reduce((acc, element) => acc + element.profit, 0)
        return acc
      }, {}),
      unknown: Object.keys(profitByHostlocation['unknown']).reduce((acc, neighburhood) => {
        acc[neighburhood] = profitByHostlocation['unknown'][neighburhood].reduce((acc, element) => acc + element.profit, 0)
        return acc
      }, {})
    }

    totals.spain = Object.entries(totals.spain).sort((a, b) => b[1] - a[1])
    totals.foreign = Object.entries(totals.foreign).sort((a, b) => b[1] - a[1])
    totals.unknown = Object.entries(totals.unknown).sort((a, b) => b[1] - a[1])

    totals.spain = Object.fromEntries(totals.spain)
    totals.foreign = Object.fromEntries(totals.foreign)
    totals.unknown = Object.fromEntries(totals.unknown)

    await fs.writeFile('../data/profit-by-hostlocation-and-neighburhood.json', JSON.stringify(totals, null, 2))

  } catch (error) {
    console.log(error)
  }
})()