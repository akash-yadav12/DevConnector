const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const passport = require('passport')
const path = require('path')

const app = express()


// Body parse middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// DB config
const db = require('./config/key').mongoURI

// Connect to mongoDB
mongoose.
    connect(db,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false
    })
    .then(() => console.log('Mongodb Connnection success'))
    .catch(err => console.log(err))


// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport)

//  Use Routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

// Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set Static folder

    app.use(express.static('client/build'))

    app.get('*',(req,res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})

// VsrG9kaJfqWqodjA