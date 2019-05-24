const express = require('express')
const bodyParser = require('body-parser')
var app = express();
var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.Promise = global.Promise

const { env:{ MONGO_DB = 'mongodb://localhost/demo' } } = process

mongoose.connect(MONGO_DB,
  { useNewUrlParser: true },
  function(err) {
    if(err) console.log(err)
     else console.log('Connect success')
  }
)


const userSchema = new Schema({
  name    : { type: String },
  email   : { type: String, 'default': null },
  gender  : { type: String, 'default': null },
  lastName: { type: String, 'default': null },
  mobile  : { type: String, 'default': null },
  thinks  : { type: String, 'default': null },
  createAt: { type: Date, 'default': new Date() },
  updateAt: { type: Date, 'default': new Date() }
})

const Users = mongoose.model('Users', userSchema)

const router = express.Router()
const users = {
    A: {
      _id     : '1',
      name    : 'Donald',
      lastName: 'Trump',
      mobile  : '+51999999999',
      email   : 'donal@trump.com',
      password: '123456'
    },
    B: {
      _id     : '2',
      name    : 'Vladimir',
      lastName: 'Putin',
      mobile  : '+51999999999',
      email   : 'vladimird@putin.com',
      password: '654321'
    }
  }
  
  const arrUsers = [
    {
      _id     : '1',
      name    : 'Donald',
      lastName: 'Trump',
      mobile  : '+51999999999',
      email   : 'donal@trump.com',
      password: '123456'
    },
    {
      _id     : '2',
      name    : 'Vladimir',
      lastName: 'Putin',
      mobile  : '+51999999999',
      email   : 'vladimird@putin.com',
      password: '654321'
    }
  ]

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/detail', async (req, res) => {
    const { body } = req

    console.log(body)
    try {
        await Users.create(body)
        res.json({success:true , user: 'body'})

    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  })

  app.get('/detailfromdb/:id', async (req, res) => {
    const { params: { id } } = req

    try {
      const { email, name, thinks } = await Users.findById(id).lean().select('email name thinks')
      res.json({ success: true, user: { email, name, thinks } })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  })




   app.put('/update/:id', async (req, res) => {
    const  { body }  = req
    const { params: { id } } = req

    try {
      let user = await Users.findOneAndUpdate({_id: id}, body);
  
      
          res.json({success:true , user})

      }  catch (err) {
        res.json({ success: false, error: error.message })


    }
   
  })

  app.delete('/delete/:id', async (req, res) => {
    const { params: { id } } = req

    try {
      const userd=await Users.findOneAndRemove({_id:id})  
      
          res.json({success:true , userd})

      }  catch (err) {
        res.json({ success: false, error: error.message })


    }
   
  })
  app.listen(5000, function() {
    console.log('aplicacion en el puerto 5000!');
   });