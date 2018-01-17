let bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express'),
    buscador   = require('./buscador')

let port       = process.env.PORT || 3000,
    app        = express(),
    Server     = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend:true}))
app.use('/buscador', buscador)
app.use(express.static('public'))

Server.listen(port, function(){
  console.log("Servidor en ejecución, puerto: "+port)
})
