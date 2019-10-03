const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


    let persons = [
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "gabor",
        "number": "444",
        "id": 5
      }
    ]

let date = new Date();
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
    let id = req.params.id;
    let person = persons.find(person => person.id == id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end();
    }
    
});



app.get('/info', (req, res) => {
    res.send(`<h2>Phonebook has info for ${persons.length} </h2>
    ${date}`)
})

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening at ${port}`)
})