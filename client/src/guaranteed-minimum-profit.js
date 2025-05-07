(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    let minimumProfit = data.reduce((acc, element) => {

      if(!element.price || !element.numberOfReviewsLtm || !element.minimumNights) {
        return acc
      }

      const totalNights = parseInt(element.numberOfReviewsLtm) * parseInt(element.minimumNights)

      acc.push({
        ...element,
        totalNights: totalNights,
        profit: parseFloat((parseFloat(element.price.substring(1).replace(',','')) * totalNights).toFixed(2))
      })

      return acc

    }, [])

    minimumProfit = minimumProfit.sort((a, b) => b.profit - a.profit)
    
    await fs.writeFile('../data/guaranteed-minimum-profit.json', JSON.stringify(minimumProfit, null, 2))

  } catch (error) {
    console.log(error)
  }
})()