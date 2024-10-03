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


module.exports = dbConf
