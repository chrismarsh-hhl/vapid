import { Sequelize } from 'sequelize';

/**
 * Creates initial Record schema
 */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable('records', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    created_at: {
      type: Sequelize.DATE,
    },

    updated_at: {
      type: Sequelize.DATE,
    },

    content: {
      type: Sequelize.JSON,
      defaultValue: {},
    },

    section_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'sections',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('records');
}
