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
         Product.hasMany(models.CartDetail, {foreignKey: 'ProductId'})
      }
   };
   Product.init({
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: {
               args: true,
               msg: 'Product name is required'
            },
            notNull: {
              args: true,
              msg: 'Product name is required'
            }
         }
      },
      image_url: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            isUrl: {
               args: true,
               msg: 'Link is not a valid URL'
            },
            notEmpty: {
              args: true,
              msg: 'Link is required'
            },
            notNull: {
              args: true,
              msg: 'Link is required'
            }
         }
      },
      price: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notNull: {
              args: true,
               msg: 'Product price is required'
            },
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
         allowNull: false,
         validate: {
            notNull: {
              args: true,
              msg: 'Product stock is required'
          },
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
         allowNull: false,
         validate: {
            notEmpty: {
               args: true,
               msg: 'Category name is required'
            },
            notNull: {
              args: true,
              msg: 'Product stock is required'
           },
         }
      },
   }, {
      sequelize,
      modelName: 'Product',
   });
   return Product;
};