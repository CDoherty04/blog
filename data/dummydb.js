//Establishes a connection to the database
const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: "localhost",
    database: "blog",
    user: "root",
    password: "password" //Not real
})

module.exports = pool;