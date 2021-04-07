const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const API_KEY = process.env.API_KEY

//Dependies
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
console.log(__dirname)

// Cors for cross origin allowance
const { url } = require('inspector');
app.use(express.static('dist'))

//for api key
console.log(`Your API key is ${process.env.API_KEY}`);


app.get("/", (req, res) => res.sendFile("index.html"));

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


//we need post request and fetch data
app.post('/test', async (req, res) => {
    const url = req.body.formText;
    const baseURL = `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&url=${url}`;
    const result = await fetch(baseURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'content-Type' : 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
    })
    console.log('result ====> ', res)
    try {
        const newData = await res.json();
        res.send(newData);
        console.log(result, newData);
        //return newData;
    }
    catch (error) {
        console.log("error", error);
    }
});
// get idea from https://knowledge.udacity.com/questions/533709
