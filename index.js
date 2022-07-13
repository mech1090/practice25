const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
require('./db')

const app = express()

app.use(express())
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Testing')
})

app.get('*',(req,res)=>{
    res.send('Bad_request')
})

mongoose.connection.once('open',()=>{
    app.listen(config.get('port'),()=>{
        console.log(`Server is running on port ${config.get('port')}`)
    })
    console.log('DB CONNECTED')
})

