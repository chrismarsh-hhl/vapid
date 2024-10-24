import { Sequelize } from 'sequelize';

/**
 * Creates initial User schema
 */
export async function up({ context: queryInterface }) {
  await queryInterface.createTable('users', {
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

    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    password_digest: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('users');
}
