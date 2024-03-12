var mysql = require("mysql")
var pool = mysql.createPool(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password:'1234',
        database:'flight78',
        multipleStatements:'true',
        connectionLimit:10
})
module.exports = pool;