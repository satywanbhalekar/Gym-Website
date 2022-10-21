const express = require('express')
const router = express.Router();
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose'); 

const { isAuthenticated } = require('../controllers/auth')
const { getTodoAll } = require('../mongodb/db')




const contactSchema = new mongoose.Schema({
    name: { type: String, default: 'hahaha'},
    age: { type: String, default: '22' },
    gender: { type: String, default: 'm' },
    address: { type: String, default: '22' },
    email: { type: String, default: '1@gmail.com' },
    phone: { type: String, default: '228888' },
  });
  
  var Contact = mongoose.model('Contact', contactSchema);
  router.get('/', isAuthenticated, async(req, res) => {
    let db = await getTodoAll(req.user.id)
    if (db) {
        res.render('todo/index', {
            todos: db
        })
    } else {
        res.send('Internal Server Error')
    } 
})
  
  router.post('/',isAuthenticated, (req, res)=>{
    var myData = new Contact(req.body);
    console.log(req.body);
    myData.save().then(()=>{
    res.send("<h1>This item has been saved to the database</h1>")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
  });
  })

// router.post('/', isAuthenticated, addTodoUser)

// router.get('/add', isAuthenticated, (req,res) => {
//     res.render('todo/add'); 
// });

// router.get('/delete', isAuthenticated, deleteTodoUser)

// router.get('/edit/:id', isAuthenticated, (req,res) => {
//     res.render('todo/edit', {
//         _id: req.params.id
//     }); 
// });

// router.post('/edit', isAuthenticated, editTodoUser)

module.exports = router