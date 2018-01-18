let express = require('express')
let storage = require('../storage')
let Router = express.Router()


Router.get('/bienes',function(req,res){
  storage.getDataBienes()
  .then(function(data){
    res.json(data)
  }).catch(function(error){
    res.sendStatus(500).json(error)
  })
})

Router.get('/ciudades',function(req,res){
  storage.getDataBienes()
  .then(function(data){
    res.json(data)
  }).catch(function(error){
    res.sendStatus(500).json(error)
  })
})

module.exports = Router
