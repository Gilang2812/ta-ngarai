// require("dotenv").config();

const { Sequelize } = require('sequelize')
let user = process.env.USER
let password = process.env.PASS
let host = process.env.HOST
let db_name = process.env.DB_NAME
let db  = process.env.DB

const dbConf = new Sequelize(
  `${db}://${user}:${password}@${host}/${db_name}`
)
try {
   dbConf.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = dbConf
