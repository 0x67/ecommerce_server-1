'use strict';
const {
   Model
} = require('sequelize');

const {
   hashPassword
} = require('../../helpers/password')
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         User.hasMany(models.Product, {
            foreignKey: 'UserId'
         })
      }
   };
   User.init({
      email: {
         type: DataTypes.STRING,
         validate: {
            isEmail: {
               args: true,
               msg: "Not a valid email"
            },
            notEmpty: {
               args: true,
               msg: 'Email is required'
            },
         },
         unique: true,
      },
      password: {
         type: DataTypes.STRING,
         validate: {
            notEmpty: {
               args: true,
               msg: 'Password is required'
            }
         }
      },
      role: DataTypes.STRING
   }, {
      sequelize,
      modelName: 'User',
   });
   User.beforeCreate((instance, options) => {
      instance.password = hashPassword(instance.password)
   })
   return User;
};