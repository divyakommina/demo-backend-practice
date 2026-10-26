const connection = require("../db");


//insert a new record in the database
const addStudent = (req, res) => {
    const { id, name, email, cgpa } = req.body;

    if(id == 0 || name == "" || email == "" || cgpa == ""){
        return res.status(400).send("All fields are required");
    }

    connection.query(
        "INSERT INTO student (id, name, email, cgpa) VALUES (?, ?, ?, ?)",
        [id, name, email, cgpa],
        (err, result) => {
            if (err) {
                // console.log(err);
                return res.status(500).send("Error inserting student");
            }

            res.status(201).json({
                message: "Student added successfully",
                student: { id, name, email, cgpa }
            });
        }
)};

//updating a student record by id using put method

const updateStudent = (req, res) => {
    
    const { id,name, email, cgpa } = req.body;

    if(id == 0 || name == "" || email == "" || cgpa == ""){
        return res.status(400).send("All fields are required");
    }

    connection.query(
        "UPDATE student SET name = ?, email = ?, cgpa = ? WHERE id = ?",
        [name, email, cgpa, id],
        (err, result) => {
            if (err) {
                // console.log(err);
                return res.status(500).send("Error updating student");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Student not found");
            }

            res.status(200).json({
                message: "Student updated successfully",
                student: { id, name, email, cgpa }
            });
        }
    )};

    // patch method to update a student record

    const patchStudent = (req, res) => {
        const { id, name, email, cgpa } = req.body;

        if(id == 0){
            return res.status(400).send("Student ID is required");
        }

        let updateFields = [];
        let updateValues = [];

        if (name !== undefined) {
            updateFields.push("name = ?");
            updateValues.push(name);
        }

        if (email !== undefined) {
            updateFields.push("email = ?");
            updateValues.push(email);
        }

        if (cgpa !== undefined) {
            updateFields.push("cgpa = ?");
            updateValues.push(cgpa);
        }

        if (updateFields.length === 0) {
            return res.status(400).send("No fields to update");
        }

        updateValues.push(id);

        connection.query(
            `UPDATE student SET ${updateFields.join(", ")} WHERE id = ?`,
            updateValues,
            (err, result) => {
                if (err) {
                    // console.log(err);
                    return res.status(500).send("Error updating student");
                }

                if (result.affectedRows === 0) {
                    return res.status(404).send("Student not found");
                }

                res.status(200).json({
                    message: "Student updated successfully",
                    student: { id, name, email, cgpa }
                });
            }
        )};
    

// delete a student by id

const deleteStudent =  (req, res) => {
    const id = req.params.id;

    connection.query(
        "DELETE FROM student WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                // console.log(err);
                return res.status(500).send("Error deleting student");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Student not found");
            }

            res.status(200).send("Student deleted successfully");
        }
    )};

module.exports = { addStudent, deleteStudent };