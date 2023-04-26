var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var states = {
    login: false,
    inGame: false
}

var mysql = require('mysql')

const app = express()

app.use(cors())
app.use(bodyParser.json())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: 'project6'
})
con.connect((err) => {
    if (err) throw err
    console.log("connected");
})


app.get('/', (req, res) => {

    con.query("select * from homePage;", (err, result) => {
        if (err) {
            res.status(500).send()
            throw err
        }
        else {
            res.json(result)
        }
    })
})

app.post('/adminLogin', (req, res) => {
    if (req.body.username === "admin" && req.body.password === "admin123") {
        state.login = true
        res.status(200).send("okay")
    }
    else {
        res.status(500).send("wrong")
    }
})

app.post('/blog',(req,res)=>{
    console.log(req.body);
    res.send()
})

app.listen(3001, () => {
    console.log("start");
})
