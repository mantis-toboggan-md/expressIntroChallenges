var express = require('express');
var app = express();
const fs = require('fs')
var port = process.env.PORT || 8000;
let idCount = 1;

app.get('/create/:name/:age', function(req, res) {
 let olddata = JSON.parse(fs.readFileSync(`${__dirname}/storage.json`))
 olddata.push({
   id: idCount,
   name: req.params.name,
   age: req.params.age
 })
 fs.writeFileSync(`${__dirname}/storage.json`, JSON.stringify(olddata))
 idCount++
 res.end()
  // fs.appendFileSync(`${__dirname}/storage.json`,JSON.stringify(new Person(req.params.name, req.params.age)))
});

app.get('/', (req,res)=>{
  res.type('json');
  res.send(fs.readFileSync(`${__dirname}/storage.json`))
})

app.get('/:id',(req,res)=>{
  let names = require('./storage.json');
  res.json(names.filter((person)=>person.id == req.params.id))
  res.end()
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
