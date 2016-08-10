import express from 'express'
import qs from 'qs'
import { findByCriteria, findAll } from '../storage'

const Router = express.Router()

// GET /
Router.get('/', (req, res) => {
  res.json(findAll())
})

// GET /search?params...
Router.get('/search', (req, res) => {
  let querystring = req.query
  let result = findByCriteria(querystring)
  res.json(result)
})

export default Router
