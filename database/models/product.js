'use strict';
const {
   Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Product extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Product.belongsTo(models.User, {
            foreignKey: 'UserId'
         })
      }
   };
   Product.init({
      name: {
         type: DataTypes.STRING,
         validate: {
            notEmpty: {
               args: true,
               msg: 'Product name is required'
            },
         }
      },
      image_url: {
         type: DataTypes.STRING,
         validate: {
            isUrl: {
               args: true,
               msg: 'Link is not a valid URL'
            }
         }
      },
      price: {
         type: DataTypes.INTEGER,
         validate: {
            notEmpty: {
               args: true,
               msg: 'Product price is required'
            },
            isNumeric: {
               args: true,
               msg: 'Product price must contain only number'
            },
            min: {
               args: 1,
               msg: 'Product price minimum must start from 1'
            }
         }
      },
      stock: {
         type: DataTypes.INTEGER,
         validate: {
            notEmpty: {
               args: true,
               msg: 'Product stock is required'
            },
            isNumeric: {
               args: true,
               msg: 'Product stock must contain only number'
            },
            min: {
               args: 1,
               msg: 'Product price minimum must start from 1'
            }
         }
      },
      UserId: DataTypes.INTEGER,
      category: {
         type: DataTypes.STRING,
         validate: {
            notEmpty: {
               args: true,
               msg: 'Category name is required'
            }
         }
      },
   }, {
      sequelize,
      modelName: 'Product',
   });
   return Product;
};