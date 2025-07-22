const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const morgan=require('morgan')


const cityRoutes=require('./routes/cities')
const visitRoutes=require('./routes/visits')


dotenv.config()
const app=express()
app.set('view engine', 'ejs');
app.set('views', './views');
const PORT=process.env.PORT||3000

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))     
app.use('/cities',cityRoutes)
app.use('/',visitRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('mongo db has connectedd'))
    .catch((err)=>console.error('unfirtuneatly mongo has not been connected'+err))

app.get('/',(req,res)=>{
    res.send('the server is alive?lol')
})

app.listen(PORT,()=>{
    console.log('yes its alive on port '+PORT)
})
