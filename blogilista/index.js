const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')


mongoose
    .connect(config.mongoUrl, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to database', config.mongoUrl)
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const server = http.createServer(app)

if (process.env.NODE_ENV !== 'test') {
    server.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`)
    })
    
}

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}