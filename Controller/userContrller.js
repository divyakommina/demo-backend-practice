const connecion = require("../db");

const addUser = async (req,res)=>{

    try{
        const {id,name,adhar,phno} = req.body;
        
if(id == 0 || name == "" || adhar == "" || phno == ""){
    return res.status(400).send("All fields are required");
}
        const [result] = await conection.promise().query(
            "Insert into user(id,name,adhar,phno) values (?,?,?,?)",
            [id,name,adhar,phno]
        );
        res.status(201).json({
            message: "User added successfully",
            user: { id, name, adhar, phno }
        });
    }catch(err){
        console.error(err);
        res.status(500).send("Error adding user");
    }
}

// 