'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hosters', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      hostId: {
        type: Sequelize.INTEGER
      },
      listingUrl: {
        type: Sequelize.STRING
      },
      hostUrl: {
        type: Sequelize.STRING
      },
      hostSince: {
        type: Sequelize.DATEONLY
      },
      hostName: {
        type: Sequelize.STRING
      },
      hostLocation: {
        type: Sequelize.STRING
      },
      neighburhood: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      roomType: {
        type: Sequelize.STRING
      },
      propertyType: {
        type: Sequelize.STRING
      },
      bedrooms: {
        type: Sequelize.INTEGER
      },
      minimumNights: {
        type: Sequelize.INTEGER
      },
      beds: {
        type: Sequelize.INTEGER
      },
      reviewScoresRating: {
        type: Sequelize.FLOAT
      },
      numberOfReviews: {
        type: Sequelize.INTEGER
      },
      availability30: {
        type: Sequelize.INTEGER
      },
      availability60: {
        type: Sequelize.INTEGER
      },
      availability90: {
        type: Sequelize.INTEGER
      },
      availability365: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      accommodates: {
        type: Sequelize.INTEGER
      },
      numberOfReviewsLtm: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hosters')
  }
}
