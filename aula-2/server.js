const express = require('express');
const path = require('path');

const app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
});


app.use(express.static(path.join(__dirname, 'static')));

app.listen(8080, function(){
    console.log('server rodando na porta 8080');
});