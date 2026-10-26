
const StudentRouter =require("express").Router();

const { addStudent, deleteStudent } = require("../Controller/studentController");

StudentRouter.post("/student", addStudent);

StudentRouter.delete("/student/:id", deleteStudent);

module.exports = StudentRouter;