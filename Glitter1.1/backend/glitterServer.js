const fs = require("fs");
const cors = require("cors");
const express = require('express');
// const bodyParser = require("body-parser");


//copy n past from Getting started to run it with postgres
const { Client } = require('pg');
const client = new Client({
    user: "postgres",
    database: "glitter", 
    password: "postgres",
    port: 5432,
    host:"127.0.0.1",
})

client.connect()

const app = express();
app.use(cors())
app.use(express.json());

const hostname = "0.0.0.0"
const port = 4000

//const glittsFile = "./glitts.json" is commented out, because the following lines should replace this function 
//Adding new rows expecting to get a connection with postgres
//const res = await client.query("select * from glitts");
//console.log(res.rows) 


class Glitt {
    user;
    text;
   // datetime;

    constructor(data) {
        this.user = data.user;
        this.text = data.text;
       // this.datetime = data.datetime;
    }
}

function readGlittsFromFile() {
    try {
        const dataBuffer = fs.readFileSync(glittsFile)
        const data = dataBuffer.toString()
        const json = JSON.parse(data)
        return json
    } catch (e) {
        return []
    }
}
// query the content via the database
app.get("/glitts", (request, response) => {
    client.query("select * from glitts", (err,res)=>{
        if(!err){
            const glitts = [];
            res.rows.forEach(row=>glitts.push(new Glitt(row)));
            response.status(201).send(glitts)
        }
        else{
            response.status(400).send("cant load message")
            console.log(err) 
        }

    })
});




/*app.post("/glitts", (request, response) => {
    const glitts = readGlittsFromFile();
    const glitt = new Glitt(request.payload);
    glitts.push(glitt)
    fs.writeFileSync(glittsFile, JSON.stringify(glitts))
    response.send(glitt);
});

app.listen(4000, () => {
    console.log("Listen on the port 4000...");
});*/

//Post entry to the database
app.post('/glitts', (req, res)=> {
    const glitts = req.pg;
    const insertQuery = "INSERT INTO glitts(user, text) VALUES($1, $2)"
    client.query(insertQuery,[req.body.user, req.body.text], (err, result)=>{
        if(!err){
            res.status(201).send('Insertion was successful')
        }
        else{
            res.status(400).send("Insertion was not successful")
            console.log(err.message) }
    })
    
})
app.listen(port, () => {
    console.log(`Listen on the port ${port}...`);
});