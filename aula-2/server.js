const express = require('express');
const path = require('path');


let filmes = [
    {
        id: 1,
        titulo: 'Spider-Man: Longe de casa',
        duracao: 129,
        genero: 'Aventura'
    },
    {
        id: 2,
        titulo: 'Toy Story 4',
        duracao: 100,
        genero: 'Animacao'
    },
    {
        id: 3,
        titulo: 'X-Men: Fênix Negra',
        duracao: 113,
        genero: 'Acao'
    }
];

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
});


app.use(express.static(path.join(__dirname, 'static')));

app.listen(8080, function(){
    console.log('server rodando na porta 8080');
});

app.put('/filme/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, duracao, genero } = req.body;

    filmes.forEach((filme, idx)=>{
        if(`${filme.id}` === id){
            filmes[idx] = {
                id,
                titulo,
                duracao,
                genero
            }
        }
    })    

    res.send(filmes)
});