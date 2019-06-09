'use strict'
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('pages/index', {page: 'Home'})
})

app.get('/rules', (req, res) => {
  res.render('pages/rules', {page: 'Rules'})
})

app.get('/local', (req, res) => {
  res.render('pages/local')
})

app.get('/online', (req, res) => {
  res.render('pages/online', {page: 'Online'})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Started dots-and-boxes')
  console.log('Started on port ' + port)
})