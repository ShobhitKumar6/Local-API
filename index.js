import mongoose from 'mongoose';
import express from 'express'
import studentModel from './model/studentModel.js';

const app = express();

app.use(express.json());
await mongoose.connect("mongodb://localhost:27017/school").then(() => {
    // console.log("____connected____")
})


app.get("/", async (req, resp) => {

    const studentData = await studentModel.find()
    resp.send(studentData)
})

app.post("/save", async (req, resp) => {
    console.log(req.body);
    const { name, age, email } = req.body;
    if (!name || !age || !email) {
        resp.send({
            message: "data not stored",
            success: false,
            storedInfo: null
        })
    }

    const studentData = await studentModel.create(req.body)

    resp.send({
        message: "data stored",
        success: true,
        storedInfo: studentData
    })
})

app.put("/update/:id",async(req,resp)=>{
    console.log(req.body);
    const id = req.params.id;
    const studentData = await studentModel.findByIdAndUpdate(id,{
        ...req.body
    })
    resp.send({
        massage:"data updated",
        success:true,
        info:studentData
    })
})

app.delete("/delete/:id",async(req,resp)=>{
    const id = req.params.id;
    const studentData = await studentModel.findByIdAndDelete(id,{
        ...req.body
    })
    resp.send({
        massage:"data deleted",
        success:true,
        info:studentData
    })
})

app.listen(3200)

// async function dbConnection() {
//     await mongoose.connect("mongodb://localhost:27017/school");
//     const schema = mongoose.Schema({
//         name: String,
//         email: String,
//         age: Number
//     })

//     const studentsModel = mongoose.model('students',schema);
//     const result = await studentsModel.find();
//     console.log(result);

// }

// dbConnection();