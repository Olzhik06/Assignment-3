const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const collection = require('./config')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static("public"))

app.get("/", function (req, res) {
    res.render("login");
})

app.post("/login",async function (req, res) {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("User can`t be found");
        }
        const passwordMatch = await collection.findOne({password: req.body.password});
        if(passwordMatch){
            res.render("home");
        }else{
            res.send("Wrong password")
        }
    }catch{
        res.send("Wrong detailes")
    }
})

app.get("/signup",function (req, res) {
    res.render("signup");
})

app.post("/signup", async function (req,res){
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exists. Enter a different username")
    }else {
        const userData = await collection.insertMany(data)
        console.log(userData)
    }
})


const PORT = 5000
app.listen(PORT, function () {
    console.log(`Server is active at http://localhost:${PORT}`)
});