let fs = require('fs'),
    path = require('path')

module.exports = {
  saveData: function(dataType, newData, data){
    let dataPath = __dirname + path.join('/data/data.json')
    data.current.push(newData)
    return new Promise(function(resolver,reject){
      fs.writeFile(dataPath, JSON.stringify(data), function(err){
        if(err) reject(err)
        resolve('OK')
      })
    })
  },
  getDataBienes: function(){
    let dataPath = __dirname + path.join('/data/data.json')
    return new Promise(function(resolver,rechazar){
      fs.readFile(dataPath, 'utf8', function(err, readData){
        if(err) rechazar(err)
        resolver(JSON.parse(readData))
      })
    })
  },
  getDataCiudades: function(){
    let dataPath = __dirname + path.join('/data/data.json')
    return new Promise(function(resolver,rechazar){
      fs.readFile(dataPath, 'utf8', function(err, readData){
          console.log("readData: "+readData)
        if(err) rechazar(err)
        resolver(JSON.parse(readData))
      })
    })
  }
}
