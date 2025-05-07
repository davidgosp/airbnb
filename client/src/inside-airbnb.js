(async () => {

  const fs = require('fs/promises')
  const papaparse = require('papaparse')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb.csv', 'utf-8')
    const data = papaparse.parse(file, { 
      header: true
    }).data

    await fs.writeFile('../data/inside-airbnb.json', JSON.stringify(data, null, 2))

  } catch (error) {
    console.log(error)
  }
})()