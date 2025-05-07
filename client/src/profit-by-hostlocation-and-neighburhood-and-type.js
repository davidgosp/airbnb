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
        acc['spain'][element.neighburhood] = {}
        acc['foreign'][element.neighburhood] = {}
        acc['unknown'][element.neighburhood] = {}
      }

      if(!acc['spain'][element.neighburhood][element.propertyType] || !acc['spain'][element.neighburhood][element.propertyType] || !acc['spain'][element.neighburhood][element.propertyType]) {
        acc['spain'][element.neighburhood][element.propertyType] = []
        acc['foreign'][element.neighburhood][element.propertyType] = []
        acc['unknown'][element.neighburhood][element.propertyType] = []
      }
    
      if(!element.hostLocation) {
        acc['unknown'][element.neighburhood][element.propertyType].push(element)
      }
      else if(element.hostLocation.includes('Spain')) {
        acc['spain'][element.neighburhood][element.propertyType].push(element)
      } 
      else {
        acc['foreign'][element.neighburhood][element.propertyType].push(element)
      }

      return acc
    }, {})

    const totals = {
      spain: Object.keys(profitByHostlocation['spain']).reduce((acc, neighburhood) => {
        acc[neighburhood] = Object.keys(profitByHostlocation['spain'][neighburhood]).reduce((acc, propertyType) => {
          acc[propertyType] = profitByHostlocation['spain'][neighburhood][propertyType].reduce((acc, element) => acc + element.profit, 0)
          return acc
        }, {})
        return acc
      }, {}),
      foreign: Object.keys(profitByHostlocation['foreign']).reduce((acc, neighburhood) => {
        acc[neighburhood] = Object.keys(profitByHostlocation['foreign'][neighburhood]).reduce((acc, propertyType) => {
          acc[propertyType] = profitByHostlocation['foreign'][neighburhood][propertyType].reduce((acc, element) => acc + element.profit, 0)
          return acc
        }, {})
        return acc
      }, {}),
      unknown: Object.keys(profitByHostlocation['unknown']).reduce((acc, neighburhood) => {
        acc[neighburhood] = Object.keys(profitByHostlocation['unknown'][neighburhood]).reduce((acc, propertyType) => {
          acc[propertyType] = profitByHostlocation['unknown'][neighburhood][propertyType].reduce((acc, element) => acc + element.profit, 0)
          return acc
        }, {})
        return acc
      }, {})
    }

    totals.spain = Object.entries(totals.spain).reduce((acc, [neighburhood, propertyType]) => {
      acc[neighburhood] = Object.entries(propertyType).sort((a, b) => b[1] - a[1])
      return acc
    }, {})

    totals.foreign = Object.entries(totals.foreign).reduce((acc, [neighburhood, propertyType]) => {
      acc[neighburhood] = Object.entries(propertyType).sort((a, b) => b[1] - a[1])
      return acc
    }, {})

    totals.unknown = Object.entries(totals.unknown).reduce((acc, [neighburhood, propertyType]) => {
      acc[neighburhood] = Object.entries(propertyType).sort((a, b) => b[1] - a[1])
      return acc
    }, {})

    totals.spain = Object.fromEntries(Object.entries(totals.spain).map(([neighburhood, propertyType]) => {
      return [neighburhood, Object.fromEntries(propertyType)]
    }))

    totals.foreign = Object.fromEntries(Object.entries(totals.foreign).map(([neighburhood, propertyType]) => {
      return [neighburhood, Object.fromEntries(propertyType)]
    }))

    totals.unknown = Object.fromEntries(Object.entries(totals.unknown).map(([neighburhood, propertyType]) => {
      return [neighburhood, Object.fromEntries(propertyType)]
    }))

    await fs.writeFile('../data/profit-by-hostlocation-and-neighburhood-and-type.json', JSON.stringify(totals, null, 2))

  } catch (error) {
    console.log(error)
  }
})()