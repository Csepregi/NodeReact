const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set("useFindAndModify", false);
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  number: { 
    type: Number,
    required: true,
    unique: true
  },
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Item', itemSchema)