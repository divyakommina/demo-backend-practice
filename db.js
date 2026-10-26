const db = require("mysql2");

const connection = db.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass",
    database: "demo"
});

connection.connect((err)=>{
    if(err){
        console.log("Error connecting to database", err);
    }else{
        console.log("Connected to database");
    } 
 });


module.exports = connection;