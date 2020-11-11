'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
         'Products',
         'UserId', {
            type: Sequelize.INTEGER,
            references: {
               model: 'Users',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
         }
      )
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Products', 'UserId' );
   }
};