'use strict';
const {hashPassword} = require('../../helpers/password')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
         {
            email: 'gabriel@admin.com',
            password: hashPassword('gabriel@admin.com'),
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            email: 'test@customer.com',
            password: hashPassword('test@customer.com'),
            role: 'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
         }
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
