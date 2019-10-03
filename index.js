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

app.delete('/api/persons/:id', (req, res) => {
  let id = Number(req.params.id);
  console.log(id);
  persons = persons.find(person => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons/', (req, res) => {
    const body = req.body;
    // if (!body.content) {
    //   return response.status(400).json({ 
    //     error: 'content missing' 
    //   })
    // }
  
    const person = {
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * 10000),
    }
  
    persons = persons.concat(person)
  

    res.json(persons);
})


app.get('/info', (req, res) => {
    res.send(`<h2>Phonebook has info for ${persons.length} </h2>
    ${date}`)
})

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening at ${port}`)
})