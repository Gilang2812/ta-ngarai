// require("dotenv").config();

const { Sequelize } = require("sequelize");
let user = process.env.DB_USER;
let password = process.env.DB_PASS;
let host = process.env.DB_HOST;
let db_name = process.env.DB_NAME;
let db = process.env.DB;

const sequelize = new Sequelize(
  `${db}://${user}:${password}@${host}/${db_name}`
);
try {
  sequelize.authenticate();
  console.log(user, password, host, db_name, db);
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
