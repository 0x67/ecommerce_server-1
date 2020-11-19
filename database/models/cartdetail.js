'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartDetail.belongsTo(models.ShoppingCart, {foreignKey: 'CartId'})
      CartDetail.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  };
  CartDetail.init({
    ProductId: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartDetail',
  });
  return CartDetail;
};

/*
quantity: {
  type: DataTypes.INTEGER,
  validate: {
    min: {
      args: 1,
      msg: `Product quantity must be more than 0`
    }
  }
},
*/