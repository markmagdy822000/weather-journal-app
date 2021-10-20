projectData = {};
const port = 8800

const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

/* Middle Ware */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors())

app.use(express.static('website'))

// setup server
app.listen(port, () => {
    console.log(`your server is working at ${port}`)
})

app.get("/getWeatherData", (req, res) => {
    res.send(projectData)
})

app.post("/saveData", (req, res) => {
    projectData = { ...req.body};
    res.send(projectData);
})