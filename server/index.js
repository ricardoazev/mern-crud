const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema database
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    telefone: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("user", schemaData)

// ler
//http://localhost:8080/
app.get("/", async (req, res) => {
    const data = await userModel.find({})

    res.json({success: true , data : data})
})

// criar dados || salve dados em mongoose
//http://localhost:8080/create
app.post("/create", async (req, res) => {
    console.log(req.body)

    const data = new userModel(req.body)
    await data.save()

    res.send({ success : true, msg : "dados salvos com sucesso", data : data })
})

//atualizar || update
//http://localhost:8080/update
app.put("/update", async (req,res) => {
    console.log(req.body)
    const {_id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({_id : _id},rest)
    res.send({ success: true, msg: "atualização de dados com sucesso !", data : data})
})

//deletar 
//http://localhost:8080/delete/64fba2343295d7bc11fe6125 id exemplo
app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id 
    console.log(id)
    const data = await userModel.deleteOne({_id: id})
    res.send({ success: true, msg: " dados deletados com sucesso !", data : data})

})

//conecção com banco
mongoose.connect("mongodb://127.0.0.1:27017/crud_operacao")
.then(() => {
    console.log("conectado ao mongoDB!")
    app.listen(PORT,() => console.log(`Servidor rodando na porta ${PORT}`))
})
.catch((error) => console.log(error))

