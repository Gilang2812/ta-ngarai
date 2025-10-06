// require("dotenv").config();

const { Sequelize } = require("sequelize");
let user = process.env.DB_USER || 'root';
let password = process.env.DB_PASS || '';
let host = process.env.DB_HOST || 'localhost';
let port = process.env.DB_PORT || 3306;
let db_name = process.env.DB_NAME || 'kotogadang';
let db = process.env.DB || 'mysql';


const sequelize = new Sequelize(
  `${db}://${user}:${password}@${host}:${port}/${db_name}`
);
try {
  sequelize.authenticate();
  console.log(user, password, host, port, db_name, db);
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
