module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Hoster',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      hostId: {
        type: DataTypes.INTEGER
      },
      listingUrl: {
        type: DataTypes.STRING
      },
      hostUrl: {
        type: DataTypes.STRING
      },
      hostSince: {
        type: DataTypes.DATEONLY
      },
      hostName: {
        type: DataTypes.STRING
      },
      hostLocation: {
        type: DataTypes.STRING
      },
      neighburhood: {
        type: DataTypes.STRING
      },
      latitude: {
        type: DataTypes.FLOAT
      },
      longitude: {
        type: DataTypes.FLOAT
      },
      roomType: {
        type: DataTypes.STRING
      },
      propertyType: {
        type: DataTypes.STRING
      },
      bedrooms: {
        type: DataTypes.INTEGER
      },
      minimumNights: {
        type: DataTypes.INTEGER
      },
      beds: {
        type: DataTypes.INTEGER
      },
      reviewScoresRating: {
        type: DataTypes.FLOAT
      },
      numberOfReviews: {
        type: DataTypes.INTEGER
      },
      availability30: {
        type: DataTypes.INTEGER
      },
      availability60: {
        type: DataTypes.INTEGER
      },
      availability90: {
        type: DataTypes.INTEGER
      },
      availability365: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.DECIMAL(10, 2)
      },
      accommodates: {
        type: DataTypes.INTEGER
      },
      numberOfReviewsLtm: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE,
        get () {
          return this.getDataValue('createdAt')
            ? this.getDataValue('createdAt').toISOString().split('T')[0]
            : null
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get () {
          return this.getDataValue('updatedAt')
            ? this.getDataValue('updatedAt').toISOString().split('T')[0]
            : null
        }
      }
    }, {
      sequelize,
      tableName: 'hosters',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        }
      ]
    }
  )

  Model.associate = function (models) {

  }

  return Model
}
