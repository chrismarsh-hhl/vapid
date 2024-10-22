import { Sequelize } from 'sequelize';

/**
 * Sortable/draggable records
 */
export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('sections', 'sortable', {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  });

  await queryInterface.addColumn('records', 'position', {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('sections', 'sortable');
  await queryInterface.removeColumn('records', 'position');
}
