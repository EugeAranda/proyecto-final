/* dotenv */
const dotenv = require("dotenv").config();

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

let query = `CREATE TABLE IF NOT EXISTS user ( id INT NOT NULL AUTO_INCREMENT , name VARCHAR(50) NOT NULL UNIQUE, lastname VARCHAR(50) NOT NULL , email TEXT(255) NOT NULL, message VARCHAR(255) NOT NULL, date DATE DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (id)) `;

async function execute(query) {
  try {
    connection.connect();
    connection.query(query);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
execute(query).then((result) => {
  if (result) {
    console.log("Mysql connected...");
  }
});

module.exports = connection;
