'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'RTX 3090 FE',
          category: 'Graphic Cards',
          price: 10000000,
          stock: 10,
          image_url: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-shop-630-d@2x.png',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ryzen 7 3700X',
          category: 'Processor',
          price: 5000000,
          stock: 5,
          image_url: 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-7-pib-left-facing-1260x709.png?itok=ACRb3hX0',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};