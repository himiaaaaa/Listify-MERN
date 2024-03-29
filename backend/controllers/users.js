const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const cloudinary = require('../utils/cloudinary.js')

//get all users
usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		title: 1,
		desc: 1,
		id: 1,
	})
	res.json(users)
})

//get user
usersRouter.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password')

		res.status(200).json(user)
	} catch (err) {
		res.status(500).json(err)
	}
})

//UPDATE
usersRouter.put('/:id', async (req, res) => {
	try {

		const { id, password, profilePic, ...rest } = req.body

		if (id === req.params.id) {

			if (password) {
				const salt = await bcrypt.genSalt(10)
				req.body.password = await bcrypt.hash(req.body.password, salt)
			}

			let updatedUser = { ...rest }

			if (profilePic) {
				const result = await cloudinary.uploader.upload(profilePic, {
					folder: 'bloglist',
				})

				updatedUser.profilePic = {
					public_id: result.public_id,
					url: result.secure_url,
				}
			}

			updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{ $set: updatedUser },
				{ new: true }
			)

			res.status(200).json(updatedUser)

		} else {
			res.status(401).json('You can only update your account')
		}
	} catch (err) {

		res.status(500).json(err)

	}
})

//DELETE
usersRouter.delete('/:id', async (req, res) => {
	if (req.body.id === req.params.id) {
		try {

			//const user = await User.findById(req.params.id)
			await User.findById(req.params.id)

			try {
				//await Post.deleteMany({ username: user.username });
				await User.findByIdAndDelete(req.params.id)

				res.status(200).json('User has been deleted')

			} catch (err) {

				res.status(500).json(err)

			}
		} catch (err) {
			res.status(404).json('User not found!')
		}
	} else {
		res.status(401).json('You can delete only your account!')
	}
})

module.exports = usersRouter
