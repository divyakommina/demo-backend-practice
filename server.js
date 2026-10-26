const express = require("express");

const app = express();

const StudentRouter = require("./Router/studentRouter");
app.use(express.json());

app.use("/", StudentRouter);


app.get("/students", (req, res) => {
    connection.query("SELECT * FROM student", (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error retrieving students");
        }
        res.json(results);
    });
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");  
});