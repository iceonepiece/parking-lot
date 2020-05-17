import debug from 'debug';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import pg from 'pg';

pg.defaults.parseInt8 = true;

const postgresUri = process.env.POSTGRES_URI || 'postgres://localhost/parking-lot-api';

const sequelize = new Sequelize(postgresUri, {
  logging: v => debug('app:sequelize')(v),
  dialect: 'postgres',
});

const db = { sequelize };

const files = fs.readdirSync(path.join(__dirname, 'models'));

files.forEach((file) => {
  const modelName = file.charAt(0).toUpperCase() + file.split('.')[0].slice(1);
  db[modelName] = db.sequelize.import(path.join(__dirname, 'models', file));
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
