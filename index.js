const PORT = 8000
const axios = require("axios").default
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const app = express()

app.use(cors())


app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getRandom',
        params: { wordLength: '5', excludes: '-' },
        headers: {
            //'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
            //'X-RapidAPI-Key': process.env.RAPID_API_KEY
            'X-RapidAPI-Key': '99f96ab0cfmsh1dea2f53f05230ep161d3bjsn4ac7a2c22dbc',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    }

    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(response.data[0])
    }).catch((error) => {
        console.error(error)
    })
})

app.get('/check', (req, res) => {

    const word = req.query.word

    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
        params: { entry: word },
        headers: {
            'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
    }

    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(response.data.result_msg)
    }).catch((error) => {
        console.error(error)
    })
})



app.listen(PORT, () => console.log('Server running on port ' + PORT))


