const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AuthRouter = require('express').Router()
const User = require('../models/user')

//REGISTER
AuthRouter.post('/register', async (req, res, next) => {
	try {
		const { username, email, password } = req.body
 
		if(!(username || email || password)){
			next('Please provide required fields!')
			return
		}

		const userExist = await User.findOne({ email })

		if(userExist) {
			next('Email Address Already Exists')
			return
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		})

		res.status(200).json(user)

	} catch (err) {
		res.status(500).json(err)
	}
})

//LOGIN
AuthRouter.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await User.findOne({username})

		const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password)

		if (!user || !passwordCorrect) {
			return res.status(401).json({
				error: 'invalid username or password',
			})
		}

		const userForToken = {
			username: user.username,
			id: user.id,
		}

		const token = jwt.sign(userForToken, process.env.SECRET, {
			expiresIn: 60 * 60,
		})

		res
			.status(200)
			.send({ token, 
				username: user.username, 
				profilePic: user.profilePic.url,
				email: user.email,
				id: user.id
			})

	} catch (err){
		res.status(500).json(err)
	}
})

module.exports = AuthRouter
