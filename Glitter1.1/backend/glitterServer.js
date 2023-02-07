const fs = require("fs");
const cors = require("cors");
const express = require('express');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//copy n past from Getting started to run it with postgres
const { Client } = require('pg');
const { response } = require("express");
const client = new Client({
    user: "postgres",
    database: "glitter", 
    password: "postgres",
    port: 5432,
    host:"locolhost",
})

await client.connect()

const app = express();
app.use(cors())

const hostname = "0.0.0.0"
const port = 4000

//const glittsFile = "./glitts.json" is commented out, because the following lines should replace this function 
//Adding new rows expecting to get a connection with postgres
const res = await client.query("select * from glitts");
console.log(res.rows) 


class Glitt {
    user;
    text;
    datetime;

    constructor(data) {
        this.user = data.user;
        this.text = data.text;
        this.datetime = data.datetime;
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
    response.send(readGlittsFromFile().reverse());
});

client.query(("select * from glitts").then((err, res) => {
    if (!response.ok) {
        console.log(glitts)} 
    client.end()
    }))



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
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
app.listen(4000, () => {
    console.log("Listen on the port 4000...");
});