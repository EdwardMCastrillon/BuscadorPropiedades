/*
* Module dependencies
*/
import http from 'http'
import express from 'express'
import Routes from './api'

// Check if exist a env vble named port
const port = process.env.PORT || 8080
const app = express()
const Server = http.createServer(app)

// Api Version
const apiVersion = 'v1'

app.use(express.static('public'))
app.use(`/api/${apiVersion}/properties`, Routes)

Server.listen(port, () => console.log(`Server is running on port: ${port}`))
