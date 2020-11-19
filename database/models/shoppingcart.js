'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingCart.hasMany(models.CartDetail, {foreignKey: 'CartId'})
      ShoppingCart.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  ShoppingCart.init({
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};