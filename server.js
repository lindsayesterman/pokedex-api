
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const POKEDEX = require('./pokedex.json')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  console.log(authToken)
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next()
})
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

function handleGetTypes(req, res){
  res.json(validTypes)
}

app.get('/types', handleGetTypes) 

function handleGetPokemon (req, res) {
  const response = POKEDEX.pokemon;
  if(req.query.name){
    response = response.filter(pokemon => 
      pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
      )
    }
    
    if (req.query.type) {
      response = response.filter(pokemon =>
        pokemon.type.toLowerCase().includes(req.query.type.toLowerCase())
        )
      }
      
      res.json(response)
    }
    
    app.get('/pokemon', handleGetPokemon)
    
    const PORT = 8000
    
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`)
    })