const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const app = express()

// DB config
const db = require('./config/key').mongoURI

// Connect to mongoDB
mongoose.
    connect(db,{
        useNewUrlParser:true,useUnifiedTopology:true
    })
    .then(() => console.log('Mongodb Connnection success'))
    .catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send('hey there')
})


//  Use Routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})

// VsrG9kaJfqWqodjA