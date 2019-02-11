// const todos =  [
//     {
//       id: 1,
//       task: "Meet mark zuckerberg!",
//       completed:true
//     }
// ];



// module.exports.todos = todos;

var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user:"rahul",
    password:"19081991",
    database:"todos"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Mysql Status => Connected to database Todos!");
  });


module.exports = con;