require('dotenv').config();
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const connection = {
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    host: process.env.HOST,
    model: process.env.DATABASE_MODEL,
    dialect: process.env.DATABASE_DIALECT
}
const sequelize = new Sequelize(connection)

const db = {};
db.sequelize = sequelize;

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.' !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize);
        db[ model.name ] = model;
    })

    
Object.keys(modelName => {
    if (db[ modelName ].associate)
        db[ modelName ].associate();
})

module.exports = db;