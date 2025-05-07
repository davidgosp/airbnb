(async () => {

  const fs = require('fs/promises')
  const papaparse = require('papaparse')

  try {
    
    const file = await fs.readFile('../data/allotjaments_turistics_mallorca.csv', 'utf-8')
    
    const data = papaparse.parse(file, { 
      header: true
    }).data

    await fs.writeFile('../data/tourist-accommodations.json', JSON.stringify(data, null, 2))

  } catch (error) {
    console.log(error)
  }
})()