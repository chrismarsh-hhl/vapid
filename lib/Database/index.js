import path from 'path';
import Sequelize from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { Utils, __dirname } from '../utils/index.js';
import SectionModel from './models/section.js';
import RecordModel from './models/record.js';
import UserModel from './models/user.js';

import Builder from './Builder.js';

/**
 * @private
 *
 * Define the ORM models and associations
 *
 * @return {{Section, Record, User}} instantiated database models
 */
function _defineModels() {
  const Section = SectionModel(this.sequelize, Sequelize.DataTypes);
  const Record = RecordModel(this.sequelize, Sequelize.DataTypes);
  const User = UserModel(this.sequelize, Sequelize.DataTypes);

  Section.Record = Section.hasMany(Record, { as: 'records' });
  Record.Section = Record.belongsTo(Section, { as: 'section' });

  return {
    Section,
    Record,
    User,
  };
}

/**
 * @private
 *
 * Initializes Sequelize ORM
 *
 * @return {Sequelize}
 */
function _initSequelize() {
  if (process.env.DATABASE_URL) {
    const dbURL = process.env.DATABASE_URL;
    const dialect = dbURL.split(':')[0];
    const config = Utils.merge(this.config, { dialect });

    return new Sequelize(dbURL, config);
  }

  return new Sequelize(this.config);
}

/**
 * @private
 *
 * Setup migrations
 */
function _initMigrations() {
  const umzug = new Umzug({
    storage: new SequelizeStorage({ sequelize: this.sequelize }),
    storageOptions: {
      sequelize: this.sequelize,
    },
    context: this.sequelize.getQueryInterface(),
    migrations: {
      glob: `${path.join(__dirname, '../**/migrations')}/*.js`,
    },
  });
  return umzug;
}

/**
 * Database
 */
class Database {
  /**
   * @param {Object} config
   */
  constructor(config) {
    this.config = Utils.merge({}, config);
    this.sequelize = _initSequelize.call(this);
    this.models = _defineModels.call(this);
    this.migrations = _initMigrations.call(this);
    this.builder = config.templatesPath
      ? new Builder(config.templatesPath)
      : null;
  }

  /**
   * Run pending migrations
   */
  async connect() {
    await this.migrations.up();
    if (!this.builder) {
      return;
    }
    await this.builder.init(this.models.Section);
  }

  /**
   * Safely close the DB connection
   */
  async disconnect() {
    await this.sequelize.close();
  }

  async rebuild() {
    if (!this.builder) {
      return;
    }
    await this.builder.build(this.models.Section);
  }

  /**
   * Determines if tree has changed since last build
   *
   * @todo Cache so this isn't as taxing on the load time
   */
  get isDirty() {
    if (!this.builder) {
      return false;
    }
    return this.builder.isDirty;
  }
}

export default Database;
