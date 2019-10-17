const itemsRouter = require('express').Router()
const Item = require('../models/Item')

itemsRouter.get('/', (req, res) => {
  Item.find({}).then(items => {
    res.json(items.map(item => item.toJSON()))
  })
})

itemsRouter.get('/:id', (req, res, next) => {
  Item.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

itemsRouter.delete('/:id', (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

itemsRouter.post('/', (req, res) => {
  const body = req.body
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

itemsRouter.get('/:id', (req, res) => {
  Item.findById(req.params.id).then(item => {
    res.json(item.toJSON())
  })
})

itemsRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  const item = {
    name: body.name,
    number: body.number
  }

  Item.findByIdAndUpdate(id, req.params.id, item, { new : true })
    .then(updatedItem => {
      res.json(updatedItem.toJSON())
    })
    .catch(error => next(error))
})

module.exports = itemsRouter