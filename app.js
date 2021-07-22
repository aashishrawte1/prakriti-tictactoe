const express = require('express')
const { gameStart } = require('./utils/game')

const app = express()
const port = 5050

app.get('/game', (req, res) => {
    res.send(gameStart)
})


app.listen(port, (req, res) => {
    console.log(`http://127.0.0.1:${port}`)
})