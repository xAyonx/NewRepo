const fs = require("fs");
const cors = require("cors");
const express = require('express');

const app = express();
app.use(cors())

const hostname = "0.0.0.0"
const port = 4000
const glittsFile = "./glitts.json"

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

app.get("/glitts", (request, response) => {
    response.send(readGlittsFromFile().reverse());
});

app.post("/glitts", (request, response) => {
    const glitts = readGlittsFromFile();
    const glitt = new Glitt(request.payload);
    glitts.push(glitt)
    fs.writeFileSync(glittsFile, JSON.stringify(glitts))
    response.send(glitt);
});

app.listen(4000, () => {
    console.log("Listen on the port 4000...");
});
