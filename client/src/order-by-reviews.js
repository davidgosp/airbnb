(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf-8')
    const data = JSON.parse(file)

    const sortedListings = data.sort((a, b) => parseInt(b.numberOfReviewsLtm) - parseInt(a.numberOfReviewsLtm));
    
    await fs.writeFile('../data/order-by-review.json', JSON.stringify(sortedListings, null, 2))

  } catch (error) {
    console.log(error)
  }
})()