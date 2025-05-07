(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb.json', 'utf-8')
    const data = JSON.parse(file)

    const dataFiltered = data.map(element => {
      return {
        hostId: element.host_id,
        listingUrl: element.listing_url,
        hostUrl: element.host_url,
        hostSince: element.host_since,
        hostName: element.host_name,
        hostLocation: element.host_location,
        neighburhood: element.neighbourhood_cleansed,
        roomType: element.room_type,
        propertyType: element.property_type,
        bedrooms: element.bedrooms,
        minimumNights: element.minimum_nights,
        beds: element.beds,
        reviewScoresRating: element.review_scores_rating,
        numberOfReviews: element.number_of_reviews,
        availability30: element.availability_30,
        availability60: element.availability_60,
        availability90: element.availability_90,
        availability365: element.availability_365,
        price: element.price,
        accommodates: element.accommodates,
        numberOfReviewsLtm: element.number_of_reviews_ltm
      }
    })
    
    await fs.writeFile('../data/inside-airbnb-filter.json', JSON.stringify(dataFiltered, null, 2))

  } catch (error) {
    console.log(error)
  }
})()