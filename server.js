const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const morgan=require('morgan')
dotenv.config()

const app=express()
const PORT=process.env.PORT||3000

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))     

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('mongo db has connectedd'))
    .catch((err)=>console.error('unfirtuneatly mongo has not been connected'+err))

app.get('/',(req,res)=>{
    res.send('the server is alive?lol')
})

app.listen(PORT,()=>{
    console.log('yes its alive on port '+PORT)
})
