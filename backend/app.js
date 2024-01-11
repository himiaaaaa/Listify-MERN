//const http = require('http')
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')
const categoryRouter = require('./controllers/categories')
const commentsRouter = require('./controllers/comments')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'public/Images')
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'))
app.use('/images', express.static('Images'))
  
app.post('/api/upload', upload.single('file'), (req, res) => {
	console.log(req.file)
	res.status(200).json(req.file.filename)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

//app.use('/images', express.static(path.join(__dirname, '/images')))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/comments', commentsRouter)


if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
