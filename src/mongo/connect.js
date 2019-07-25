// const mongodb = require('mongodb')
const mongoose = require('mongoose')

// const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGO_ATLAS_URI;

mongoose.connect(process.env.MONGO_ATLAS_URI, { useNewUrlParser:true, useCreateIndex: true }, () => {
  console.log('OK')
})

const Message = mongoose.model('Message', {
  content:{
    type:String
  },
  user:{
    type:String
  }

})

module.exports = Message