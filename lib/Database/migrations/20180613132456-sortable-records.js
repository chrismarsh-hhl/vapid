/**
 * Sortable/draggable records
 */
export default {
  up: async (queryInterface, Sequelize) => [
    queryInterface.addColumn('sections', 'sortable', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }),

    queryInterface.addColumn('records', 'position', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),
  ],

  down: async (queryInterface) => [
    queryInterface.removeColumn('sections', 'sortable'),
    queryInterface.removeColumn('records', 'position'),
  ],
};
