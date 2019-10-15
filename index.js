require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Item = require('./models/Item');

const app = express();

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

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


let date = new Date();

  
app.get('/api/persons', (req, res) => {
  Item.find({}).then(items => {
    res.json(items.map(item => item.toJSON()))
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Item.findById(req.params.id)
  .then(note => {
    if (note) {
      res.json(note.toJSON())
    } else {
      res.status(404).end() 
    }
  })
  .catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
});

app.post('/api/persons/', (req, res) => {
    const body = req.body;
  
    const person = new Item ({
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * 10000),
    })
  
    person.save()
      .then(savedItem => savedItem.toJSON())
      .then(savedAndFormattedItem => {
        res.json(savedAndFormattedItem)
      }) 
})


app.get('/info', (req, res) => {
    res.send(`<h2>Phonebook has info for ${persons.length} </h2>
    ${date}`)
});

app.get('/api/persons/:id', (req, res) => {
  Item.findById(req.params.id).then(item => {
    res.json(item.toJSON());
  })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const item = {
    name: body.name,
    number: body.number
  }

  Item.findByIdAndUpdate(id, req.params.id, item, {new : true})
    .then(updatedItem => {
      res.json(updatedItem.toJSON());
  })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
  return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})