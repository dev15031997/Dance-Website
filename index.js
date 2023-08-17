
const express= require("express")
const app=express()
const path=require('path')
const bodyparser=require('body-parser')

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/contactDance',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log(err)
})


// define mongo schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String, 
  });

var Contact = mongoose.model('Contact', contactSchema);

// middleware
app.use(express.json()); 


// static files
app.use('/static',express.static('static')) 
app.use(express.urlencoded({ extended: true }));                        
    
// pug template config
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))


// routing
app.get('/',(req,res)=>
{
    const params={}
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>
{
    const params={}
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>
{
    console.log(req.body)
    var myData=new Contact(req.body)
    myData.save().then(()=>
    {
         res.send('This Item has been saved to database')
    }).catch(()=>
    {
        res.status(400).send("Item was not saved")
    })
})


app.listen(80,()=>{
    console.log("server working");
})
