const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.static('build'))

morgan('tiny')

morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(bodyParser.json());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger);


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
  
    if(!body.name || !body.number) {
      return res.status(400).json({
        error: 'content missing'
      })
    }
    //  const Samename = persons.find(person => person.name === body.name);
    //  console.log(name, Samename);
  
    // if(Samename){
    //   return res.status(404).json({
    //     error: 'name is already used'
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}




app.use(unknownEndpoint)

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})