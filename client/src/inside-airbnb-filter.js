(async () => {

  const fs = require('fs/promises')

  try {
    
    const file = await fs.readFile('../data/inside-airbnb.json', 'utf-8')
    const data = JSON.parse(file)

    const dataFiltered = data.map(element => {
      return {
        hostId: element.host_id ? element.host_id : null,
        listingUrl: element.listing_url ? element.listing_url : null,
        hostUrl: element.host_url ? element.host_url : null,
        hostSince: element.host_since ? element.host_since : null,
        hostName: element.host_name ? element.host_name : null,
        hostLocation: element.host_location ? element.host_location : null,
        neighburhood: element.neighbourhood_cleansed ? element.neighbourhood_cleansed : null,
        latitude: element.latitude ? element.latitude : null,
        longitude: element.longitude ? element.longitude : null,
        roomType: element.room_type ? element.room_type : null,
        propertyType: element.property_type ? element.property_type : null,
        bedrooms: element.bedrooms ? element.bedrooms : null,
        minimumNights: element.minimum_nights ? element.minimum_nights : null,
        beds: element.beds ? element.beds : null,
        reviewScoresRating: element.review_scores_rating ? element.review_scores_rating : null,
        numberOfReviews: element.number_of_reviews ? element.number_of_reviews : null,
        availability30: element.availability_30 ? element.availability_30 : null,
        availability60: element.availability_60 ? element.availability_60 : null,
        availability90: element.availability_90 ? element.availability_90 : null,
        availability365: element.availability_365 ? element.availability_365 : null,
        price: element.price ? element.price.replace('$', '').replace(',','') : null,
        accommodates: element.accommodates ? element.accommodates : null,
        numberOfReviewsLtm: element.number_of_reviews_ltm ? element.number_of_reviews_ltm : null,
      }
    })
    
    await fs.writeFile('../data/inside-airbnb-filter.json', JSON.stringify(dataFiltered, null, 2))

    const response = await fetch('http://localhost:8080/api/admin/hosters/bulk-create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFiltered)
    })

    const result = await response.json()

  } catch (error) {
    console.log(error)
  }
})()