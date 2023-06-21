import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Videos from './dbModel.js'

//app config
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://admin:admin@cluster0.guw0n9i.mongodb.net/tiktokDB'


//middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url)

//api endpoints
app.get("/", (req, res) => res.status(200).send("Tiktok mern"))

app.post('/v2/posts',(req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send(err))
})

app.get('/v2/posts',(req, res) => {
    Videos.find()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.listen(port, () => console.log(`Listening on localhost: ${port}`))